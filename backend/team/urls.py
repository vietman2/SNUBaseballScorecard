from django.urls import path

from . import views

urlpatterns = [
    path('<str:tournament>/', views.teams_by_tournament, name='teams_by_tournament'),
    path('setGroup/<str:team>/<str:group>/', views.setGroup, name='setGroup'),
]