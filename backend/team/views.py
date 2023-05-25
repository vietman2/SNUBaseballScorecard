from django.http import JsonResponse
from django.forms.models import model_to_dict

from tournament.models import Tournament
from group.models import Group
from .models import Team_Record

# Create your views here.

def teams_by_tournament(request, tournament):
    if request.method == 'GET':
        t = Tournament.objects.get_by_name(tournament)
        teams = Team_Record.objects.filter(tournament=t)

        team_list = []
        for team in teams:
            team_dict = model_to_dict(team)
            team_dict['num_players'] = team.team_player.count()
            team_list.append(team_dict)

        return JsonResponse(team_list, safe=False)

    
def teams_player_num(request, tournament):
    pass
    
def setGroup(request, tournament, team, group):
    if request.method == 'PUT':
        team_record = Team_Record.objects.get_team_record(tournament, team)
        grp = Group.objects.get_group(tournament, group)
        team_record.group = grp
        team_record.save()
        return JsonResponse({'message': 'success', 'team': team_record.team.name}, status=200)