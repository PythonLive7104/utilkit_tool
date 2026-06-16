import secrets
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone

# How long an email-verification link stays valid.
VERIFICATION_TTL_HOURS = 48


def _new_token():
    return secrets.token_urlsafe(32)


class EmailVerification(models.Model):
    """A pending email-verification link for a newly registered advertiser.

    One per user. The user is created inactive; clicking the link (which carries
    ``token``) activates the account. Re-registering an unverified email rotates
    the token and resends the email.
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='email_verification',
    )
    token = models.CharField(max_length=64, unique=True, default=_new_token)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'verification for {self.user.email}'

    @property
    def is_expired(self):
        return timezone.now() - self.created_at > timedelta(hours=VERIFICATION_TTL_HOURS)

    def rotate(self):
        self.token = _new_token()
        self.save(update_fields=['token', 'created_at'])
