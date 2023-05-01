from django.urls import path

from . import views

urlpatterns = [
    path('search_by_name/<str:name>/', views.search_by_name, name='search_by_name'),
    path('search_by_student_id/<str:student_id>/', views.search_by_student_id, name='search_by_student_id'),
    path('create/<str:student_id>/<str:name>/<str:elite>/<str:team_name>/<str:college>/<str:department>/<str:status>/', views.create, name='create'),
    path('create_tournament/<str:student_id>/<str:team_name>/<str:college>/<str:department>/<str:status>/', views.create_tournament, name='create_tournament'),
]