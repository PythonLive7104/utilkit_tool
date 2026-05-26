from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/urls/', include('url_shortener.urls')),
    path('api/email/', include('temp_email.urls')),
    path('api/bg/', include('bg_remover.urls')),
    path('api/ai/', include('ai_tools.urls')),
    path('api/payments/', include('payments.urls')),
    path('api/contact/', include('contact.urls')),
    # Short-link redirect lives at the root so /s/<code> is clean
    path('s/', include('url_shortener.redirect_urls')),
]
