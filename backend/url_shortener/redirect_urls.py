from django.urls import path
from .redirect_views import redirect_short_url

urlpatterns = [
    path('<str:code>/', redirect_short_url, name='short-redirect'),
]
