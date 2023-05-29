from django.urls import path

from .views import TeamRecordsAPI

urlpatterns = [
    path('records/', TeamRecordsAPI.as_view(), name='team_record')
]