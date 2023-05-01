from django.http import JsonResponse

from .models import Player, Player_Tournament
from team.models import Team

# Create your views here.

def search_by_name(request, name):
    if request.method == 'GET':
        players = Player.objects.filter(name=name).values()
        player_list = [p for p in players]
        return JsonResponse(player_list, safe=False)
    
def search_by_student_id(request, student_id):
    if request.method == 'GET':
        players = Player.objects.filter(student_id=student_id).values()
        player_list = [p for p in players]
        return JsonResponse(player_list, safe=False)
    
def create(request, student_id, name, elite, team_name, college, department, status):
    if request.method == 'POST':
        player = Player(student_id=student_id, name=name, elite=elite)
        player.save()
        team = Team.objects.get(name=team_name)
        player_tournament = Player_Tournament(player=player, team=team_name, college=college, department=department, status=status)
        player_tournament.save()
        return JsonResponse({'result': 'success'})
    
def create_tournament(request, student_id, team_name, college, department, status):
    if request.method == 'POST':
        player = Player.objects.get(student_id=student_id)
        team = Team.objects.get(name=team_name)
        player_tournament = Player_Tournament(player=player, team=team_name, college=college, department=department, status=status)
        player_tournament.save()
        return JsonResponse({'result': 'success'})