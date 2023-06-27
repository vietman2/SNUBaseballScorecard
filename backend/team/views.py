from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from tournament.models import Tournament
from .models import Team_Record
from .serializers import TeamInfosSerializer

class TeamRecordsAPI(APIView):
    def get(self, request):
        tournament_name = request.query_params.get('tournament')

        if tournament_name is None:
            return Response({'message': 'tournament is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        tournament = Tournament.objects.get_by_name(tournament_name)
        team_records = Team_Record.objects.filter(tournament=tournament)

        serializer = TeamInfosSerializer(team_records, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    