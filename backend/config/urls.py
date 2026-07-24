from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    # temp_email and url_shortener apps fully removed as abuse-associated
    # (disposable email flagged by AdSense; the shortener was abused as an open
    # phishing redirector). Their tables are dropped by accounts/migrations
    # 0002 and 0003 respectively.
    path('api/bg/', include('bg_remover.urls')),
    path('api/ai/', include('ai_tools.urls')),
    path('api/billing/', include('payments.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/ads/', include('advertising.urls')),
]

# In development Django serves uploaded media. In production nginx serves
# /media/ from the shared volume (see nginx.conf + docker-compose.yml).
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
