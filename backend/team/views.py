from django.http import JsonResponse

from tournament.models import Tournament
from .models import Team, Team_Record

# Create your views here.

def teams_by_tournament(request, tournament):
    if request.method == 'GET':
        t = Tournament.objects.get_by_name(tournament)
        teams = Team_Record.objects.filter(tournament=t).values()
        team_list = [t for t in teams]
        return JsonResponse(team_list, safe=False)
    
def setGroup(request, team, group):
    if request.method == 'PUT':
        team = Team_Record.objects.get_by_name(team)
        team.group = group
        team.save()
        return JsonResponse({'message': 'success', 'team': team.team.name}, status=200)