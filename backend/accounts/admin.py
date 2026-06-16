from django.contrib import admin

from .models import EmailVerification


@admin.register(EmailVerification)
class EmailVerificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'created_at', 'is_expired')
    search_fields = ('user__email', 'user__username')
    readonly_fields = ('token', 'created_at')

    @admin.display(boolean=True, description='Expired')
    def is_expired(self, obj):
        return obj.is_expired
