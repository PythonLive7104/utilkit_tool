from django.urls import path
from .views import ShortenView, ShortUrlDetailView

urlpatterns = [
    path('shorten/', ShortenView.as_view(), name='url-shorten'),
    path('<str:code>/', ShortUrlDetailView.as_view(), name='url-detail'),
]
