from django.urls import path

from . import views

urlpatterns = [
    path('register/', views.register, name='auth-register'),
    path('verify-email/', views.verify_email, name='auth-verify-email'),
    path('resend-verification/', views.resend_verification, name='auth-resend-verification'),
    path('login/', views.login, name='auth-login'),
    path('logout/', views.logout, name='auth-logout'),
    path('me/', views.me, name='auth-me'),
]
