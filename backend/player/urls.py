from django.urls import path

from . import views
from .views import PlayerInfosAPI

urlpatterns = [
    path('excel/', views.excel_file, name='excel_file'),
    path('info/list/', PlayerInfosAPI.as_view(), name='player_info_list')
]