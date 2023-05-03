from django.http import JsonResponse

from tournament.models import Tournament
from group.models import Group
from .models import Team, Team_Record

# Create your views here.

def teams_by_tournament(request, tournament):
    if request.method == 'GET':
        t = Tournament.objects.get_by_name(tournament)
        teams = Team_Record.objects.filter(tournament=t).values()
        team_list = [t for t in teams]
        return JsonResponse(team_list, safe=False)
    
def setGroup(request, tournament, team, group):
    if request.method == 'PUT':
        team_record = Team_Record.objects.get_team_record(tournament, team)
        grp = Group.objects.get_group(tournament, group)
        team_record.group = grp
        team_record.save()
        return JsonResponse({'message': 'success', 'team': team_record.team.name}, status=200)