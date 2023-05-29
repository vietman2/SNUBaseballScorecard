from django.urls import path

from .views import GroupsAPI

urlpatterns = [
    path('list/', GroupsAPI.as_view(), name='groups_by_tournament'),
]