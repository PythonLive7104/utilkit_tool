import secrets
from django.db import models
from django.utils import timezone


def generate_code():
    """6-character URL-safe random code."""
    return secrets.token_urlsafe(4)[:6]


class ShortUrl(models.Model):
    code = models.CharField(max_length=50, unique=True, db_index=True, default=generate_code)
    original_url = models.URLField(max_length=2000)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(null=True, blank=True)
    clicks = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.code} → {self.original_url[:60]}'

    @property
    def is_expired(self):
        return bool(self.expires_at and timezone.now() > self.expires_at)

    def record_click(self):
        ShortUrl.objects.filter(pk=self.pk).update(clicks=models.F('clicks') + 1)
