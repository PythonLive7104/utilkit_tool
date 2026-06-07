from rest_framework import serializers

from .models import AdSlot, Advertisement


class AdSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdSlot
        fields = ('code', 'name', 'description', 'recommended_size', 'price_usd', 'duration_days')


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

    class Meta:
        model = Advertisement
        fields = (
            'slot', 'advertiser_name', 'company', 'advertiser_email',
            'image', 'target_url', 'alt_text',
        )

    def validate_image(self, image):
        if image.size > 3 * 1024 * 1024:
            raise serializers.ValidationError('Image must be 3 MB or smaller.')
        return image
