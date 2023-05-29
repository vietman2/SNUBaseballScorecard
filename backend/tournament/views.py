from django.http import JsonResponse
from rest_framework.generics import ListCreateAPIView

from .models import Tournament
from .serializers import TournamentSerializer

class TournamentsAPI(ListCreateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
