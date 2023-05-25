from django.urls import path

from . import views

urlpatterns = [
    path('names/', views.names, name='names'),
]