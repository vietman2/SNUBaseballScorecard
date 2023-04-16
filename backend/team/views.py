from django.http import JsonResponse

from tournament.models import Tournament
from .models import Team, Team_Record

# Create your views here.

## NEEDFIX: This is a stub view. It should be replaced with a real view.
def teams_by_tournament(request, tournament):
    if request.method == 'GET':
        t = Tournament.objects.get_by_name(tournament)
        teams = Team_Record.objects.filter(tournament=t).values()
        team_list = [t for t in teams]
        return JsonResponse(team_list, safe=False)
