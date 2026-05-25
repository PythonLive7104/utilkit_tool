from django.shortcuts import redirect
from django.http import Http404
from .models import ShortUrl


def redirect_short_url(request, code):
    try:
        short = ShortUrl.objects.get(code=code)
    except ShortUrl.DoesNotExist:
        raise Http404

    if short.is_expired:
        raise Http404

    short.record_click()
    return redirect(short.original_url, permanent=False)
