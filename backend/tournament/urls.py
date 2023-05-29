from django.urls import path

from .views import TournamentsAPI

urlpatterns = [
    path('list/', TournamentsAPI.as_view(), name='names'),
]