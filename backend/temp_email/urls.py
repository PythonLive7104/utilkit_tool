from django.urls import path
from .views import (
    CreateAddressView,
    AddressDetailView,
    ExtendAddressView,
    MessagesView,
    MessageDetailView,
    IncomingWebhookView,
    DomainsView,
)

urlpatterns = [
    path('create/', CreateAddressView.as_view(), name='email-create'),
    path('domains/', DomainsView.as_view(), name='email-domains'),
    path('inbound/', IncomingWebhookView.as_view(), name='email-inbound'),
    path('<str:address>/', AddressDetailView.as_view(), name='email-detail'),
    path('<str:address>/extend/', ExtendAddressView.as_view(), name='email-extend'),
    path('<str:address>/messages/', MessagesView.as_view(), name='email-messages'),
    path('<str:address>/messages/<int:pk>/', MessageDetailView.as_view(), name='email-message-detail'),
]
