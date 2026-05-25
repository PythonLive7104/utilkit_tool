from django.urls import path
from .views import AiToolView

urlpatterns = [
    path('', AiToolView.as_view()),
]
