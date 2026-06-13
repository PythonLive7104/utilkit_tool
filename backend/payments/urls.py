from django.urls import path
from . import views

urlpatterns = [
    # Dodo posts to the URL exactly as entered in the dashboard
    # (https://utilkit.us/api/billing/webhook, no trailing slash). Accept both
    # forms so neither variant 404s.
    path('webhook', views.dodo_webhook, name='dodo-webhook'),
    path('webhook/', views.dodo_webhook),
]
