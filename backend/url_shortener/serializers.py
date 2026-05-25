from rest_framework import serializers
from .models import ShortUrl


class ShortenRequestSerializer(serializers.Serializer):
    url = serializers.URLField(max_length=2000)
    slug = serializers.SlugField(max_length=50, required=False, allow_blank=True)
    expires_in_days = serializers.IntegerField(min_value=1, max_value=365, required=False)


class ShortUrlSerializer(serializers.ModelSerializer):
    short_url = serializers.SerializerMethodField()
    is_expired = serializers.BooleanField(read_only=True)

    class Meta:
        model = ShortUrl
        fields = ['code', 'original_url', 'short_url', 'created_at', 'clicks', 'expires_at', 'is_expired']
        read_only_fields = fields

    def get_short_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(f'/s/{obj.code}/')
        return f'/s/{obj.code}/'
