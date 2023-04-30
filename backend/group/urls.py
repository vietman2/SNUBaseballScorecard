from django.urls import path

from . import views

urlpatterns = [
    path('<str:tournament>/', views.groups_by_tournament, name='groups_by_tournament'),
]