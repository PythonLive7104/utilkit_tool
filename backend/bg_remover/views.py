import requests
from django.conf import settings
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

REMOVE_BG_API = 'https://api.remove.bg/v1.0/removebg'
MAX_FREE_SIZE = 5 * 1024 * 1024   # 5 MB
MAX_PRO_SIZE  = 25 * 1024 * 1024  # 25 MB


class RemoveBackgroundView(APIView):
    """
    POST /api/bg/remove/
    Multipart form fields:
      - image: the image file
      - size:  'auto' | 'preview' | 'full'  (default 'auto')

    The API key is read from settings.REMOVE_BG_API_KEY (set via .env).
    Returning the result image as binary so the frontend can create a
    blob URL directly.
    """
    parser_classes = [MultiPartParser]

    def post(self, request):
        api_key = settings.REMOVE_BG_API_KEY
        if not api_key:
            return Response(
                {'detail': 'Background removal is not configured on this server. Set REMOVE_BG_API_KEY in .env.'},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )

        image: InMemoryUploadedFile = request.FILES.get('image')
        if not image:
            return Response({'detail': 'No image file provided.'}, status=status.HTTP_400_BAD_REQUEST)

        if not image.content_type.startswith('image/'):
            return Response({'detail': 'File must be an image (JPEG or PNG).'}, status=status.HTTP_400_BAD_REQUEST)

        if image.size > MAX_FREE_SIZE:
            return Response(
                {'detail': f'Image exceeds the 5 MB free-tier limit ({image.size // 1024} KB uploaded).'},
                status=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            )

        remove_size = request.data.get('size', 'auto')

        try:
            resp = requests.post(
                REMOVE_BG_API,
                headers={'X-Api-Key': api_key},
                files={'image_file': (image.name, image.read(), image.content_type)},
                data={'size': remove_size},
                timeout=30,
            )
        except requests.Timeout:
            return Response({'detail': 'remove.bg API timed out. Please try again.'}, status=status.HTTP_504_GATEWAY_TIMEOUT)
        except requests.RequestException as exc:
            return Response({'detail': f'Network error calling remove.bg: {exc}'}, status=status.HTTP_502_BAD_GATEWAY)

        if resp.status_code == 200:
            from django.http import HttpResponse
            return HttpResponse(
                resp.content,
                content_type='image/png',
                status=200,
            )

        # Forward remove.bg error as JSON
        try:
            error_data = resp.json()
            detail = error_data.get('errors', [{}])[0].get('title', 'remove.bg API error')
        except Exception:
            detail = f'remove.bg returned HTTP {resp.status_code}'

        return Response({'detail': detail}, status=resp.status_code)
