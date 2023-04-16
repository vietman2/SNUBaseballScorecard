from django.urls import path

from . import views

urlpatterns = [
    ## NEEDFIX: This is a stub view. It should be replaced with a real view.
    path('<str:tournament>/', views.teams_by_tournament, name='teams_by_tournament'),
]