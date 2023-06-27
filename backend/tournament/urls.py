from django.urls import path

from .views import TournamentsAPI, TournamentAPI

urlpatterns = [
    path('list/', TournamentsAPI.as_view(), name='names'),
    path('<str:name>/', TournamentAPI.as_view(), name='name')
]