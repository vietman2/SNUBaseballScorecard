from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from tournament.models import Tournament
from .models import Group
from .serializers import GroupSerializer

class GroupsAPI(APIView):
    def get(self, request):
        tournament = request.query_params.get('tournament')
        t = Tournament.objects.get_by_name(tournament)
        groups = Group.objects.all().filter(tournament=t)
        serializer = GroupSerializer(groups, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
