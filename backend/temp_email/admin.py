from django.contrib import admin
from .models import TempEmailAddress, EmailMessage


class EmailMessageInline(admin.TabularInline):
    model = EmailMessage
    extra = 0
    readonly_fields = ['sender', 'subject', 'received_at', 'read']
    fields = ['sender', 'subject', 'received_at', 'read']


@admin.register(TempEmailAddress)
class TempEmailAddressAdmin(admin.ModelAdmin):
    list_display = ['address', 'created_at', 'expires_at', 'is_expired', 'message_count']
    readonly_fields = ['created_at']
    list_filter = ['domain']
    search_fields = ['username', 'domain']
    inlines = [EmailMessageInline]

    @admin.display(description='Messages')
    def message_count(self, obj):
        return obj.messages.count()


@admin.register(EmailMessage)
class EmailMessageAdmin(admin.ModelAdmin):
    list_display = ['subject', 'sender', 'inbox', 'received_at', 'read']
    list_filter = ['read', 'received_at']
    search_fields = ['subject', 'sender', 'inbox__username']
    readonly_fields = ['inbox', 'sender', 'subject', 'body_text', 'body_html', 'received_at']
