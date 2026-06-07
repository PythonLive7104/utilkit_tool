import hashlib
import hmac
import json
import logging

from django.conf import settings
from django.http import HttpResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

logger = logging.getLogger(__name__)


@csrf_exempt
@require_POST
def paystack_webhook(request):
    secret = settings.PAYSTACK_SECRET_KEY.encode('utf-8')
    signature = request.headers.get('x-paystack-signature', '')

    expected = hmac.new(secret, request.body, hashlib.sha512).hexdigest()
    if not hmac.compare_digest(expected, signature):
        logger.warning('Paystack webhook: invalid signature')
        return HttpResponseForbidden('Invalid signature')

    try:
        payload = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse(status=400)

    event = payload.get('event')
    data  = payload.get('data', {})

    if event == 'charge.success':
        email     = data.get('customer', {}).get('email', '')
        amount    = data.get('amount', 0) / 100
        currency  = data.get('currency', '')
        reference = data.get('reference', '')
        logger.info('Payment received: %s paid %s %s (ref: %s)', email, amount, currency, reference)

        # Advertising payments use an 'ad_' reference prefix. Place the advert
        # live here as a backup to the frontend verify call.
        if reference.startswith('ad_'):
            from advertising.models import Advertisement
            ad = (Advertisement.objects
                  .filter(payment_reference=reference,
                          status=Advertisement.Status.PENDING_PAYMENT)
                  .select_related('slot')
                  .first())
            if ad:
                ad.activate()

    return HttpResponse(status=200)
