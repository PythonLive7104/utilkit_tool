from django.contrib import admin
from .models import ShortUrl


@admin.register(ShortUrl)
class ShortUrlAdmin(admin.ModelAdmin):
    list_display = ['code', 'original_url', 'clicks', 'created_at', 'expires_at', 'is_expired']
    readonly_fields = ['code', 'clicks', 'created_at']
    search_fields = ['code', 'original_url']
    list_filter = ['created_at']
