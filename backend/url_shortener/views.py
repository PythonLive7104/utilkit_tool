from django.utils import timezone
from datetime import timedelta
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ShortUrl
from .serializers import ShortenRequestSerializer, ShortUrlSerializer


class ShortenView(APIView):
    """POST /api/urls/shorten/ — create a new short URL."""

    def post(self, request):
        req_ser = ShortenRequestSerializer(data=request.data)
        req_ser.is_valid(raise_exception=True)
        data = req_ser.validated_data

        slug = data.get('slug', '').strip()

        # Custom slug collision check
        if slug and ShortUrl.objects.filter(code=slug).exists():
            return Response(
                {'detail': 'This custom slug is already taken. Choose a different one.'},
                status=status.HTTP_409_CONFLICT,
            )

        expires_at = None
        if 'expires_in_days' in data:
            expires_at = timezone.now() + timedelta(days=data['expires_in_days'])

        create_kwargs = {
            'original_url': data['url'],
            'expires_at': expires_at,
        }
        if slug:
            create_kwargs['code'] = slug

        short = ShortUrl.objects.create(**create_kwargs)

        serializer = ShortUrlSerializer(short, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ShortUrlDetailView(APIView):
    """GET /api/urls/<code>/ — retrieve info about a short URL."""

    def get(self, request, code):
        try:
            short = ShortUrl.objects.get(code=code)
        except ShortUrl.DoesNotExist:
            return Response({'detail': 'Short URL not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ShortUrlSerializer(short, context={'request': request})
        return Response(serializer.data)

    def delete(self, request, code):
        try:
            short = ShortUrl.objects.get(code=code)
        except ShortUrl.DoesNotExist:
            return Response({'detail': 'Short URL not found.'}, status=status.HTTP_404_NOT_FOUND)
        short.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
