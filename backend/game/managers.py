from django.db import models

from game.models import Game
from team.models import Team_Record

class GameManager(models.Manager):
    def get_games_by_tournament(self, tournament):
        games = Game.objects.filter(tournament=tournament)
        return games

    def get_games_by_name(self, name, tournament):
        games = Game.objects.filter(tournament=tournament, name=name)
        return games
    
    def get_games_by_team(self, team_name, tournament):
        team = Team_Record.objects.get_team_record(tournament, team_name)
        games = Game.objects.filter(tournament=tournament, team=team)
        return games