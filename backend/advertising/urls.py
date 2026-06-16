from django.urls import path

from . import views

urlpatterns = [
    path('slots/', views.slots, name='ad-slots'),
    path('active/', views.active, name='ad-active'),
    path('mine/', views.mine, name='ad-mine'),
    path('submit/', views.submit, name='ad-submit'),
    path('verify/', views.verify, name='ad-verify'),
    path('click/<int:pk>/', views.click, name='ad-click'),
]
