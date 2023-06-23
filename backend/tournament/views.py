from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView

from .models import Tournament
from .serializers import SimpleTournamentSerializer, DetailedTournamentSerializer

class TournamentsAPI(ListCreateAPIView):
    queryset = Tournament.objects.all().order_by('-start_date')
    serializer_class = SimpleTournamentSerializer

class TournamentAPI(RetrieveUpdateAPIView):
    queryset = Tournament.objects.all()
    serializer_class = DetailedTournamentSerializer
    lookup_field = getattr(Tournament, 'name')
