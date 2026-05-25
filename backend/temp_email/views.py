from django.conf import settings
from django.utils import timezone
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import TempEmailAddress, EmailMessage, generate_username
from .serializers import (
    TempEmailAddressSerializer,
    CreateAddressSerializer,
    EmailMessageSerializer,
    IncomingEmailSerializer,
)


def _available_domains():
    return getattr(settings, 'TEMP_EMAIL_DOMAINS', ['tempmail.dev'])


class CreateAddressView(APIView):
    """POST /api/email/create/ — provision a new temp email address."""

    def post(self, request):
        ser = CreateAddressSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        data = ser.validated_data

        domains = _available_domains()
        domain = data.get('domain', '') or domains[0]
        if domain not in domains:
            return Response(
                {'detail': f'Domain must be one of: {", ".join(domains)}'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        username = (data.get('username') or '').strip() or generate_username()

        # Prevent collision — generate a new username if already taken
        attempts = 0
        while TempEmailAddress.objects.filter(username=username, domain=domain).exists():
            username = generate_username()
            attempts += 1
            if attempts > 10:
                return Response({'detail': 'Could not generate a unique address.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

        address = TempEmailAddress.objects.create(username=username, domain=domain)
        return Response(TempEmailAddressSerializer(address).data, status=status.HTTP_201_CREATED)


class AddressDetailView(APIView):
    """GET /api/email/<address>/ — get info about a temp inbox."""

    def _get_inbox(self, address_str):
        try:
            username, domain = address_str.split('@', 1)
            return TempEmailAddress.objects.get(username=username, domain=domain)
        except (ValueError, TempEmailAddress.DoesNotExist):
            return None

    def get(self, request, address):
        inbox = self._get_inbox(address)
        if not inbox:
            return Response({'detail': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)
        return Response(TempEmailAddressSerializer(inbox).data)

    def delete(self, request, address):
        inbox = self._get_inbox(address)
        if not inbox:
            return Response({'detail': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)
        inbox.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ExtendAddressView(APIView):
    """POST /api/email/<address>/extend/ — add 15 minutes to expiry."""

    def post(self, request, address):
        try:
            username, domain = address.split('@', 1)
            inbox = TempEmailAddress.objects.get(username=username, domain=domain)
        except (ValueError, TempEmailAddress.DoesNotExist):
            return Response({'detail': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

        minutes = request.data.get('minutes', 15)
        try:
            minutes = int(minutes)
            if not (1 <= minutes <= 60):
                raise ValueError
        except (TypeError, ValueError):
            return Response({'detail': 'minutes must be an integer between 1 and 60.'}, status=status.HTTP_400_BAD_REQUEST)

        inbox.extend(minutes=minutes)
        return Response(TempEmailAddressSerializer(inbox).data)


class MessagesView(APIView):
    """GET /api/email/<address>/messages/ — list inbox messages."""

    def get(self, request, address):
        try:
            username, domain = address.split('@', 1)
            inbox = TempEmailAddress.objects.get(username=username, domain=domain)
        except (ValueError, TempEmailAddress.DoesNotExist):
            return Response({'detail': 'Address not found.'}, status=status.HTTP_404_NOT_FOUND)

        if inbox.is_expired:
            return Response({'detail': 'This inbox has expired.'}, status=status.HTTP_410_GONE)

        messages = inbox.messages.all()
        return Response(EmailMessageSerializer(messages, many=True).data)


class MessageDetailView(APIView):
    """GET /api/email/<address>/messages/<id>/ — retrieve and mark read."""

    def get(self, request, address, pk):
        try:
            username, domain = address.split('@', 1)
            inbox = TempEmailAddress.objects.get(username=username, domain=domain)
            message = inbox.messages.get(pk=pk)
        except (ValueError, TempEmailAddress.DoesNotExist, EmailMessage.DoesNotExist):
            return Response({'detail': 'Not found.'}, status=status.HTTP_404_NOT_FOUND)

        message.read = True
        message.save(update_fields=['read'])
        return Response(EmailMessageSerializer(message).data)


class IncomingWebhookView(APIView):
    """
    POST /api/email/inbound/
    Receives inbound email from the SMTP relay (e.g. Mailgun, Postmark, or a
    custom Postfix + script setup). Expects JSON with recipient, sender,
    subject, body_text, body_html.

    Protect this endpoint with a shared secret header in production:
      X-Webhook-Secret: <value from .env>
    """

    def post(self, request):
        ser = IncomingEmailSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        data = ser.validated_data

        try:
            username, domain = data['recipient'].split('@', 1)
            inbox = TempEmailAddress.objects.get(username=username, domain=domain)
        except (ValueError, TempEmailAddress.DoesNotExist):
            # Silently ignore mail to unknown/expired addresses
            return Response({'detail': 'Recipient not found.'}, status=status.HTTP_200_OK)

        if inbox.is_expired:
            return Response({'detail': 'Inbox expired.'}, status=status.HTTP_200_OK)

        EmailMessage.objects.create(
            inbox=inbox,
            sender=data['sender'],
            subject=data.get('subject', ''),
            body_text=data.get('body_text', ''),
            body_html=data.get('body_html', ''),
        )
        return Response({'detail': 'Message stored.'}, status=status.HTTP_201_CREATED)


class DomainsView(APIView):
    """GET /api/email/domains/ — list available temp email domains."""

    def get(self, request):
        return Response({'domains': _available_domains()})
