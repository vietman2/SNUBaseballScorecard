import pandas as pd
from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .models import Player
from team.models import Team_Record
from .serializers import PlayerInfosSerializer

@api_view(['POST'])
@parser_classes([MultiPartParser])
def excel_file(request):
    excel_file = request.FILES.get('file')

    if excel_file is None:
        return JsonResponse({
            'error': 'No excel file is attached'
        }, status=400)

    df = pd.read_excel(excel_file, engine='openpyxl')

    summary = {
        'new_players': [],
        'similar_players': [],
        'existing_players': [],
        'errors': [],
    }

    for i in range(0, df.shape[0]):
        row = df.iloc[i]

        college = row['대 학']
        department = row['학 과']
        student_id = row['학 번']
        name = row['성 명']
        status = row['재적현황']

        info = {
            'college': college,
            'department': department,
            'student_id': student_id,
            'name': name,
            'status': status,
        }

        player_exists = Player.objects.filter(student_id=student_id).exists()

        if player_exists is False:
            ## 같은 학번이 없음
            players_with_same_name = Player.objects.filter(name=name).exists()

            if players_with_same_name is False:
                ## 같은 이름이 없음
                summary['new_players'].append(info)
            else:
                ## 같은 이름이 있음
                data = {
                    'received': info,
                    'existing': [],
                }
                data['existing'] = players_with_same_name
                summary['similar_players'].append(info)

        else:
            ## 같은 학번이 있음
            player = Player.objects.get(student_id=student_id)
            if player.name == name:
                ## 이름이 같음
                summary['existing_players'].append(info)
            else:
                ## 이름이 다름
                summary['errors'].append(info)



    # Return the summary as a JSON response
    return JsonResponse(summary)

class PlayerInfosAPI(APIView):
    def get(self, request):
        tournament = request.query_params.get('tournament')
        team = request.query_params.get('team')

        if tournament is None:
            return Response({'message': 'tournament is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        if team is None:
            return Response({'message': 'team is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        team_record = Team_Record.objects.get_team_record(tournament, name=team)
        players = team_record.team_player.all()

        if players.count() == 0:
            return Response({'message': 'no players'}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PlayerInfosSerializer(players, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
