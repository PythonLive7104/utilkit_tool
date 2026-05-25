import secrets
from django.db import models
from django.utils import timezone
from django.conf import settings


def default_expiry():
    minutes = getattr(settings, 'TEMP_EMAIL_EXPIRY_MINUTES', 30)
    return timezone.now() + timezone.timedelta(minutes=minutes)


def generate_username():
    words = ['quick', 'brave', 'solar', 'neon', 'echo', 'lunar', 'swift', 'comet']
    w1 = secrets.choice(words)
    w2 = secrets.choice(words)
    num = secrets.randbelow(9000) + 1000
    return f'{w1}{w2}{num}'


class TempEmailAddress(models.Model):
    username = models.CharField(max_length=64)
    domain = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(default=default_expiry)

    class Meta:
        unique_together = [('username', 'domain')]
        ordering = ['-created_at']

    def __str__(self):
        return self.address

    @property
    def address(self):
        return f'{self.username}@{self.domain}'

    @property
    def is_expired(self):
        return timezone.now() > self.expires_at

    @property
    def seconds_remaining(self):
        delta = (self.expires_at - timezone.now()).total_seconds()
        return max(0, int(delta))

    def extend(self, minutes=15):
        self.expires_at = max(self.expires_at, timezone.now()) + timezone.timedelta(minutes=minutes)
        self.save(update_fields=['expires_at'])


class EmailMessage(models.Model):
    inbox = models.ForeignKey(TempEmailAddress, related_name='messages', on_delete=models.CASCADE)
    sender = models.CharField(max_length=320)
    subject = models.CharField(max_length=998, blank=True)
    body_text = models.TextField(blank=True)
    body_html = models.TextField(blank=True)
    received_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-received_at']

    def __str__(self):
        return f'{self.subject} from {self.sender}'
