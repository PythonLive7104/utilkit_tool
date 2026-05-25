from rest_framework import serializers
from .models import TempEmailAddress, EmailMessage


class TempEmailAddressSerializer(serializers.ModelSerializer):
    address = serializers.CharField(read_only=True)
    is_expired = serializers.BooleanField(read_only=True)
    seconds_remaining = serializers.IntegerField(read_only=True)

    class Meta:
        model = TempEmailAddress
        fields = ['id', 'address', 'username', 'domain', 'created_at', 'expires_at', 'is_expired', 'seconds_remaining']
        read_only_fields = fields


class CreateAddressSerializer(serializers.Serializer):
    domain = serializers.CharField(max_length=128, required=False)
    username = serializers.CharField(max_length=64, required=False, allow_blank=True)


class EmailMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailMessage
        fields = ['id', 'sender', 'subject', 'body_text', 'body_html', 'received_at', 'read']
        read_only_fields = fields


class IncomingEmailSerializer(serializers.Serializer):
    """Used by the SMTP webhook to create inbound messages."""
    recipient = serializers.EmailField()
    sender = serializers.EmailField()
    subject = serializers.CharField(max_length=998, allow_blank=True, default='')
    body_text = serializers.CharField(allow_blank=True, default='')
    body_html = serializers.CharField(allow_blank=True, default='')
