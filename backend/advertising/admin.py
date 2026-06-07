from django.contrib import admin
from django.utils.html import format_html

from .models import AdSlot, Advertisement


@admin.register(AdSlot)
class AdSlotAdmin(admin.ModelAdmin):
    list_display = ('name', 'code', 'recommended_size', 'price_usd', 'duration_days', 'is_active')
    list_editable = ('price_usd', 'duration_days', 'is_active')
    prepopulated_fields = {'code': ('name',)}
    search_fields = ('name', 'code')


@admin.register(Advertisement)
class AdvertisementAdmin(admin.ModelAdmin):
    list_display = (
        'advertiser_name', 'slot', 'status', 'is_live',
        'start_date', 'end_date', 'impressions', 'clicks', 'created_at',
    )
    list_filter = ('status', 'slot')
    search_fields = ('advertiser_name', 'advertiser_email', 'company', 'payment_reference')
    readonly_fields = (
        'preview', 'payment_reference', 'amount_paid', 'impressions',
        'clicks', 'created_at', 'updated_at', 'is_live',
    )
    actions = ('reactivate_ads', 'take_down_ads')
    fieldsets = (
        ('Creative', {
            'fields': ('slot', 'advertiser_name', 'company', 'advertiser_email',
                       'image', 'preview', 'target_url', 'alt_text'),
        }),
        ('Booking', {
            'fields': ('status', 'is_live', 'start_date', 'end_date'),
        }),
        ('Payment', {
            'fields': ('payment_reference', 'amount_paid'),
        }),
        ('Tracking & notes', {
            'fields': ('impressions', 'clicks', 'admin_notes', 'created_at', 'updated_at'),
        }),
    )

    @admin.display(description='Preview')
    def preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width:480px;max-height:200px;border:1px solid #ccc" />',
                obj.image.url,
            )
        return '—'

    @admin.display(boolean=True, description='Live now')
    def is_live(self, obj):
        return obj.is_live

    @admin.action(description='Re-activate selected ads (fresh booking window from today)')
    def reactivate_ads(self, request, queryset):
        n = 0
        for ad in queryset:
            ad.activate()
            n += 1
        self.message_user(request, f'{n} ad(s) re-activated and now live.')

    @admin.action(description='Take down selected ads')
    def take_down_ads(self, request, queryset):
        updated = queryset.update(status=Advertisement.Status.REJECTED)
        self.message_user(request, f'{updated} ad(s) taken down.')
