from django.urls import path

from . import views

urlpatterns = [
    path('<str:tournament>/', views.teams_by_tournament, name='teams_by_tournament'),
]