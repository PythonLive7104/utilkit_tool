import base64
import hashlib
import hmac
import json
import logging
import time

from django.conf import settings
from django.http import HttpResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

logger = logging.getLogger(__name__)

# Reject webhooks whose timestamp is more than this far from now (replay guard).
WEBHOOK_TOLERANCE_SECONDS = 5 * 60


def _verify_dodo_signature(request):
    """Verify a Dodo Payments webhook using the Standard Webhooks scheme.

    The signed content is ``{webhook-id}.{webhook-timestamp}.{raw body}`` and
    the signature is base64(HMAC-SHA256(secret, content)). The webhook-signature
    header is a space-separated list of ``v1,<signature>`` tokens.
    """
    secret = settings.DODO_WEBHOOK_KEY
    if not secret:
        logger.warning('Dodo webhook: DODO_WEBHOOK_KEY is not configured')
        return False

    wid = request.headers.get('webhook-id', '')
    wts = request.headers.get('webhook-timestamp', '')
    wsig = request.headers.get('webhook-signature', '')
    if not (wid and wts and wsig):
        return False

    try:
        if abs(time.time() - int(wts)) > WEBHOOK_TOLERANCE_SECONDS:
            logger.warning('Dodo webhook: timestamp outside tolerance')
            return False
    except ValueError:
        return False

    # The secret is base64-encoded after the 'whsec_' prefix.
    key = secret[len('whsec_'):] if secret.startswith('whsec_') else secret
    try:
        key_bytes = base64.b64decode(key)
    except (ValueError, TypeError):
        key_bytes = key.encode('utf-8')

    signed = f'{wid}.{wts}.'.encode('utf-8') + request.body
    expected = base64.b64encode(
        hmac.new(key_bytes, signed, hashlib.sha256).digest()
    ).decode('utf-8')

    for token in wsig.split():
        # Each token is 'v1,<base64-signature>'.
        _, _, sig = token.partition(',')
        if hmac.compare_digest(sig, expected):
            return True
    return False


@csrf_exempt
@require_POST
def dodo_webhook(request):
    if not _verify_dodo_signature(request):
        logger.warning('Dodo webhook: invalid signature')
        return HttpResponseForbidden('Invalid signature')

    try:
        payload = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse(status=400)

    event_type = payload.get('type')
    data = payload.get('data', {}) or {}

    if event_type == 'payment.succeeded':
        metadata = data.get('metadata') or {}
        reference = metadata.get('ad_reference', '')
        logger.info('Dodo payment succeeded: %s (ref: %s)', data.get('payment_id'), reference)

        # Advertising payments carry an 'ad_' reference in metadata. Place the
        # advert live here as a backup to the frontend verify call.
        if reference.startswith('ad_'):
            from advertising.models import Advertisement
            ad = (Advertisement.objects
                  .filter(payment_reference=reference,
                          status=Advertisement.Status.PENDING_PAYMENT)
                  .select_related('slot')
                  .first())
            if ad:
                ad.activate()
        # Otherwise it's a 'Support our team' donation — nothing to provision.

    return HttpResponse(status=200)
