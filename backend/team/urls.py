from django.urls import path

from . import views

urlpatterns = [
    path('<str:tournament>/', views.teams_by_tournament, name='teams_by_tournament'),
    path('<str:tournament>/<str:team>/', views.players_team, name='players_team'),
    path('setGroup/<str:tournament>/<str:team>/<str:group>/', views.setGroup, name='setGroup'),
]