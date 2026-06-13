from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/urls/', include('url_shortener.urls')),
    path('api/email/', include('temp_email.urls')),
    path('api/bg/', include('bg_remover.urls')),
    path('api/ai/', include('ai_tools.urls')),
    path('api/billing/', include('payments.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/ads/', include('advertising.urls')),
    # Short-link redirect lives at the root so /s/<code> is clean
    path('s/', include('url_shortener.redirect_urls')),
]

# In development Django serves uploaded media. In production nginx serves
# /media/ from the shared volume (see nginx.conf + docker-compose.yml).
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
