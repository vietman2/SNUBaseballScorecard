from django.urls import path

from . import views

urlpatterns = [
    path('excel/', views.excel_file, name='excel_file'),
]