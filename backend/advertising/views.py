import logging
import secrets

import requests
from django.conf import settings
from django.db.models import F
from django.shortcuts import get_object_or_404, redirect
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import AdSlot, Advertisement
from .serializers import AdSubmitSerializer, AdvertisementPublicSerializer

logger = logging.getLogger(__name__)


class SubmitThrottle(AnonRateThrottle):
    rate = '10/hour'


def _slot_payload(slot):
    """Slot info plus live availability for the Advertise page."""
    return {
        'code': slot.code,
        'name': slot.name,
        'description': slot.description,
        'recommended_size': slot.recommended_size,
        'price_usd': str(slot.price_usd),
        'duration_days': slot.duration_days,
        'capacity': slot.capacity,
        'spots_left': max(slot.capacity - slot.taken, 0),
        'available': slot.is_available,
        'next_available_date': slot.next_available_date,
    }


@api_view(['GET'])
def slots(request):
    """List bookable slots, their weekly price, and current availability."""
    data = [_slot_payload(s) for s in AdSlot.objects.filter(is_active=True)]
    return Response(data)


@api_view(['GET'])
def active(request):
    """Return the live ads for a category slot (used by the AdSlot component).

    Returns up to ``capacity`` live ads (two side-by-side boxes per page) plus
    the slot capacity so the frontend can fill empty boxes with a placeholder.
    Counts an impression for each ad shown.
    """
    code = request.query_params.get('slot', '')
    slot = AdSlot.objects.filter(code=code, is_active=True).first()
    if not slot:
        return Response({'ads': [], 'capacity': 0})

    live = list(slot.live_ads().order_by('?')[: slot.capacity])
    if live:
        Advertisement.objects.filter(pk__in=[a.pk for a in live]).update(
            impressions=F('impressions') + 1
        )
    data = AdvertisementPublicSerializer(live, many=True, context={'request': request}).data
    return Response({'ads': data, 'capacity': slot.capacity})


@api_view(['GET'])
def click(request, pk):
    """Count a click and redirect to the advertiser's URL."""
    ad = get_object_or_404(Advertisement, pk=pk)
    Advertisement.objects.filter(pk=ad.pk).update(clicks=F('clicks') + 1)
    return redirect(ad.target_url)


@api_view(['POST'])
@throttle_classes([SubmitThrottle])
def submit(request):
    """Create an advert in 'pending_payment' state and return Paystack params.

    Refuses if the chosen slot is already full, telling the advertiser when to
    check back (the date the earliest current advert in that slot expires).
    """
    serializer = AdSubmitSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    slot = serializer.validated_data['slot']

    if not slot.is_available:
        return Response(
            {
                'detail': 'This slot is fully booked right now.',
                'next_available_date': slot.next_available_date,
            },
            status=409,
        )

    reference = f'ad_{secrets.token_hex(8)}'
    ad = serializer.save(
        payment_reference=reference,
        amount_paid=slot.price_usd,
        status=Advertisement.Status.PENDING_PAYMENT,
    )

    return Response(
        {
            'id': ad.id,
            'reference': reference,
            'amount': str(slot.price_usd),
            'email': ad.advertiser_email,
            'public_key': settings.PAYSTACK_PUBLIC_KEY,
        },
        status=201,
    )


@api_view(['POST'])
def verify(request):
    """Verify a Paystack transaction and place the advert live immediately."""
    reference = (request.data.get('reference') or '').strip()
    if not reference:
        return Response({'detail': 'reference is required.'}, status=400)

    try:
        ad = Advertisement.objects.select_related('slot').get(payment_reference=reference)
    except Advertisement.DoesNotExist:
        return Response({'detail': 'Unknown reference.'}, status=404)

    if ad.status == Advertisement.Status.LIVE:
        # Already placed (e.g. by the webhook).
        return Response({'status': ad.status})
    if ad.status != Advertisement.Status.PENDING_PAYMENT:
        return Response({'detail': 'This advert can no longer be activated.'}, status=400)

    try:
        resp = requests.get(
            f'https://api.paystack.co/transaction/verify/{reference}',
            headers={'Authorization': f'Bearer {settings.PAYSTACK_SECRET_KEY}'},
            timeout=20,
        )
        payload = resp.json()
    except (requests.RequestException, ValueError):
        logger.exception('Paystack verify failed for %s', reference)
        return Response({'detail': 'Could not verify payment. Please contact support.'}, status=502)

    data = payload.get('data') or {}
    if not payload.get('status') or data.get('status') != 'success':
        return Response({'detail': 'Payment not successful.'}, status=400)

    expected_cents = int(round(float(ad.slot.price_usd) * 100))
    if int(data.get('amount', 0)) < expected_cents:
        logger.warning('Underpayment for %s: got %s expected %s', reference, data.get('amount'), expected_cents)
        return Response({'detail': 'Payment amount did not match the slot price.'}, status=400)

    ad.activate()
    return Response({'status': ad.status, 'end_date': ad.end_date})
