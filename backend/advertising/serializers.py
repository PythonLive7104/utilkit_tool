from rest_framework import serializers

from .models import AdSlot, Advertisement


def validate_ad_image(image):
    """Shared rule for advertiser-uploaded creatives."""
    if image.size > 3 * 1024 * 1024:
        raise serializers.ValidationError('Image must be 3 MB or smaller.')
    return image


class AdSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdSlot
        fields = ('code', 'name', 'description', 'recommended_size',
                  'price_usd', 'price_monthly_usd', 'duration_days')


class AdvertisementPublicSerializer(serializers.ModelSerializer):
    """What the frontend renders in a slot. No advertiser PII."""

    image_url = serializers.SerializerMethodField()
    click_url = serializers.SerializerMethodField()

    class Meta:
        model = Advertisement
        fields = ('id', 'image_url', 'target_url', 'alt_text', 'click_url')

    def get_image_url(self, obj):
        request = self.context.get('request')
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url

    def get_click_url(self, obj):
        request = self.context.get('request')
        url = f'/api/ads/click/{obj.id}/'
        return request.build_absolute_uri(url) if request else url


class AdSubmitSerializer(serializers.ModelSerializer):
    slot = serializers.SlugRelatedField(
        slug_field='code', queryset=AdSlot.objects.filter(is_active=True)
    )
    # advertiser_email / advertiser_name come from the logged-in account, set in
    # the view — not trusted from the client.
    advertiser_name = serializers.CharField(max_length=120, required=False, allow_blank=True)

    class Meta:
        model = Advertisement
        fields = (
            'slot', 'billing_period', 'advertiser_name', 'company',
            'image', 'target_url', 'alt_text',
        )

    def validate_image(self, image):
        return validate_ad_image(image)


class AdImageUpdateSerializer(serializers.ModelSerializer):
    """Swap just the creative image on an existing advert."""

    class Meta:
        model = Advertisement
        fields = ('image',)

    def validate_image(self, image):
        return validate_ad_image(image)


class MyAdSerializer(serializers.ModelSerializer):
    """An advertiser's own advert, for the dashboard."""

    slot_code = serializers.CharField(source='slot.code', read_only=True)
    slot_name = serializers.CharField(source='slot.name', read_only=True)
    image_url = serializers.SerializerMethodField()
    is_live = serializers.BooleanField(read_only=True)

    class Meta:
        model = Advertisement
        fields = (
            'id', 'slot_code', 'slot_name', 'billing_period', 'status', 'is_live',
            'image_url', 'target_url', 'alt_text', 'company',
            'start_date', 'end_date', 'amount_paid', 'impressions', 'clicks',
            'created_at',
        )

    def get_image_url(self, obj):
        request = self.context.get('request')
        if not obj.image:
            return None
        url = obj.image.url
        return request.build_absolute_uri(url) if request else url
