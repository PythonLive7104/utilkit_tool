import logging
import secrets

import requests
from django.conf import settings
from django.db.models import F
from django.shortcuts import get_object_or_404, redirect
from rest_framework.decorators import (
    api_view, permission_classes, throttle_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import AdSlot, Advertisement
from .serializers import (
    AdSubmitSerializer, AdvertisementPublicSerializer, MyAdSerializer,
)

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
        'price_monthly_usd': str(slot.price_monthly_usd),
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


def _dodo_headers():
    return {
        'Authorization': f'Bearer {settings.DODO_API_KEY}',
        'Content-Type': 'application/json',
    }


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@throttle_classes([SubmitThrottle])
def submit(request):
    """Create an advert in 'pending_payment' state and open a Dodo checkout.

    The advert is tied to the logged-in advertiser's account. ``billing_period``
    ('weekly' or 'monthly') picks the price and run length. Every booking — any
    slot, weekly or monthly — checks out through the single "Pay What You Want"
    product (``settings.DODO_PRODUCT_ID``); the chosen price is sent as the
    checkout amount, so one product id covers every amount. Refuses if the
    chosen slot is already full, telling the advertiser when to check back (the
    date the earliest current advert in that slot expires).
    """
    serializer = AdSubmitSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    slot = serializer.validated_data['slot']
    period = serializer.validated_data.get('billing_period', Advertisement.BillingPeriod.WEEKLY)

    if not slot.is_available:
        return Response(
            {
                'detail': 'This slot is fully booked right now.',
                'next_available_date': slot.next_available_date,
            },
            status=409,
        )

    # One product handles every booking; the price the advertiser picked is sent
    # as the checkout amount (the chosen period just selects which price).
    product_id = settings.DODO_PRODUCT_ID
    amount = (slot.price_monthly_usd
              if period == Advertisement.BillingPeriod.MONTHLY
              else slot.price_usd)
    if not product_id:
        logger.error('DODO_PAY_WHAT_YOU_WANT is not configured')
        return Response({'detail': 'Payments are not available right now.'}, status=503)

    reference = f'ad_{secrets.token_hex(8)}'
    ad = serializer.save(
        owner=request.user,
        advertiser_email=request.user.email,
        advertiser_name=serializer.validated_data.get('advertiser_name') or request.user.email,
        payment_reference=reference,
        amount_paid=amount,
        status=Advertisement.Status.PENDING_PAYMENT,
    )

    try:
        resp = requests.post(
            f'{settings.DODO_API_BASE}/checkouts',
            headers=_dodo_headers(),
            json={
                # 'amount' is in the currency's lowest unit (USD cents). Sending
                # it overrides the Pay-What-You-Want input with the exact price.
                'product_cart': [{
                    'product_id': product_id,
                    'quantity': 1,
                    'amount': int(round(float(amount) * 100)),
                }],
                'customer': {'email': ad.advertiser_email, 'name': ad.advertiser_name},
                'metadata': {'ad_reference': reference},
                'return_url': f'{settings.SITE_URL}/advertise?ad_ref={reference}',
            },
            timeout=20,
        )
        resp.raise_for_status()
        data = resp.json()
    except (requests.RequestException, ValueError):
        logger.exception('Dodo checkout creation failed for %s', reference)
        # Don't keep the slot reserved for a checkout we couldn't create.
        ad.delete()
        return Response({'detail': 'Could not start checkout. Please try again.'}, status=502)

    # The payment id only exists once the customer pays; track the session now
    # so verify() can look up its status when the advertiser returns.
    ad.dodo_session_id = data.get('session_id', '') or ''
    ad.dodo_payment_id = data.get('payment_id', '') or ''
    ad.save(update_fields=['dodo_session_id', 'dodo_payment_id'])

    return Response(
        {
            'id': ad.id,
            'reference': reference,
            'checkout_url': data.get('checkout_url'),
        },
        status=201,
    )


@api_view(['POST'])
def verify(request):
    """Check a Dodo payment's status and place the advert live if it succeeded.

    This backs up the webhook so the advertiser sees their advert go live as
    soon as they return from checkout, even before the webhook is delivered.
    """
    reference = (request.data.get('reference') or '').strip()
    if not reference:
        return Response({'detail': 'reference is required.'}, status=400)

    try:
        ad = Advertisement.objects.select_related('slot').get(payment_reference=reference)
    except Advertisement.DoesNotExist:
        return Response({'detail': 'Unknown reference.'}, status=404)

    if ad.status == Advertisement.Status.LIVE:
        # Already placed (e.g. by the webhook).
        return Response({'status': ad.status, 'end_date': ad.end_date})
    if ad.status != Advertisement.Status.PENDING_PAYMENT:
        return Response({'detail': 'This advert can no longer be activated.'}, status=400)
    if not ad.dodo_session_id:
        # No checkout was ever created; the webhook will handle it if it arrives.
        return Response({'status': ad.status})

    try:
        resp = requests.get(
            f'{settings.DODO_API_BASE}/checkouts/{ad.dodo_session_id}',
            headers=_dodo_headers(),
            timeout=20,
        )
        payload = resp.json()
    except (requests.RequestException, ValueError):
        logger.exception('Dodo verify failed for %s', reference)
        return Response({'detail': 'Could not verify payment. Please contact support.'}, status=502)

    if payload.get('payment_status') != 'succeeded':
        # Still pending or failed — let the caller poll again or rely on the webhook.
        return Response({'status': ad.status})

    payment_id = payload.get('payment_id')
    if payment_id and not ad.dodo_payment_id:
        ad.dodo_payment_id = payment_id
        ad.save(update_fields=['dodo_payment_id'])
    ad.activate()
    return Response({'status': ad.status, 'end_date': ad.end_date})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mine(request):
    """The logged-in advertiser's own adverts, newest first, for the dashboard."""
    qs = (Advertisement.objects
          .filter(owner=request.user)
          .select_related('slot'))
    data = MyAdSerializer(qs, many=True, context={'request': request}).data
    return Response(data)
