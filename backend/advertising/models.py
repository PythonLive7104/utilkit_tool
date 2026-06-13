from datetime import timedelta

from django.db import models
from django.utils import timezone

# How long a 'pending_payment' advert reserves a slot while the advertiser is
# at the Dodo Payments checkout. After this it no longer counts toward capacity.
HOLD_MINUTES = 30


class AdSlot(models.Model):
    """A bookable advertising slot, one per tool category, sold by the week.

    The ``code`` matches a tool category id (ai, pdf, image, generator,
    developer, text, calculator, viral), so an advert booked for a category
    shows on that category's tool pages. ``capacity`` is how many adverts can
    run in the slot at once (1 = one advertiser per category); when it's full,
    new advertisers are told to check back on the date the earliest current
    advert expires.
    """

    code = models.SlugField(
        max_length=40,
        unique=True,
        help_text="Tool category id this slot targets, e.g. 'pdf', 'image', 'ai'.",
    )
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255, blank=True)
    recommended_size = models.CharField(
        max_length=40, blank=True, help_text="e.g. 728×90 or 970×250"
    )
    price_usd = models.DecimalField(
        max_digits=8, decimal_places=2, default=0,
        help_text="Price for one booking period (USD).",
    )
    duration_days = models.PositiveIntegerField(
        default=7, help_text="Length of one booking, in days (7 = weekly)."
    )
    capacity = models.PositiveIntegerField(
        default=1, help_text="How many adverts can run in this slot at once."
    )
    dodo_product_id = models.CharField(
        max_length=100, blank=True,
        help_text="Dodo Payments product id for this slot's weekly booking, e.g. 'pdt_...'.",
    )
    is_active = models.BooleanField(
        default=True, help_text="Uncheck to stop selling this slot."
    )

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'{self.name} ({self.code})'

    def live_ads(self):
        today = timezone.localdate()
        return self.ads.filter(
            status=Advertisement.Status.LIVE,
            start_date__lte=today,
            end_date__gte=today,
        )

    def held_count(self):
        """Adverts mid-checkout that temporarily reserve a spot."""
        cutoff = timezone.now() - timedelta(minutes=HOLD_MINUTES)
        return self.ads.filter(
            status=Advertisement.Status.PENDING_PAYMENT, created_at__gte=cutoff
        ).count()

    @property
    def taken(self):
        return self.live_ads().count() + self.held_count()

    @property
    def is_available(self):
        return self.is_active and self.taken < self.capacity

    @property
    def next_available_date(self):
        """When the earliest current advert in a full slot expires."""
        ad = self.live_ads().order_by('end_date').first()
        return ad.end_date if ad else None


class Advertisement(models.Model):
    """A single booked advert: one creative, one slot, one booking period."""

    class Status(models.TextChoices):
        PENDING_PAYMENT = 'pending_payment', 'Pending payment'
        LIVE = 'live', 'Live'
        REJECTED = 'rejected', 'Taken down / rejected'
        EXPIRED = 'expired', 'Expired'

    slot = models.ForeignKey(AdSlot, on_delete=models.PROTECT, related_name='ads')

    # Advertiser-supplied creative
    advertiser_name = models.CharField(max_length=120)
    advertiser_email = models.EmailField()
    company = models.CharField(max_length=120, blank=True)
    image = models.ImageField(upload_to='ads/')
    target_url = models.URLField(help_text="Where the banner links to.")
    alt_text = models.CharField(max_length=120, blank=True)

    # Booking window — set automatically when the payment is confirmed.
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    # Payment
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING_PAYMENT
    )
    payment_reference = models.CharField(max_length=100, unique=True)
    dodo_session_id = models.CharField(max_length=100, blank=True)
    dodo_payment_id = models.CharField(max_length=100, blank=True)
    amount_paid = models.DecimalField(max_digits=8, decimal_places=2, default=0)

    # Lightweight tracking
    impressions = models.PositiveIntegerField(default=0)
    clicks = models.PositiveIntegerField(default=0)

    admin_notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.advertiser_name} → {self.slot.code} [{self.status}]'

    @property
    def is_live(self):
        if self.status != self.Status.LIVE:
            return False
        today = timezone.localdate()
        if self.start_date and today < self.start_date:
            return False
        if self.end_date and today > self.end_date:
            return False
        return True

    def activate(self):
        """Put the advert live immediately, starting its booking window today.

        Called when Dodo Payments confirms payment, so a paid advert is placed
        automatically without manual approval.
        """
        today = timezone.localdate()
        self.status = self.Status.LIVE
        self.start_date = today
        self.end_date = today + timedelta(days=self.slot.duration_days)
        self.save(update_fields=['status', 'start_date', 'end_date', 'updated_at'])
