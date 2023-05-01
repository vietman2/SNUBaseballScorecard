from django.db import models

from team.models import Team
from tournament.models import Tournament
from group.models import Group

# Create your models here.

## TODO: FINISH THIS
class Game(models.Model):
    gameName = models.CharField(max_length=10)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    gameDate = models.DateField()
    gameStartTime = models.TimeField()
    team1 = models.ForeignKey(Team, on_delete=models.DO_NOTHING, related_name='team1')
    team2 = models.ForeignKey(Team, on_delete=models.DO_NOTHING, related_name='team2')
    done = models.BooleanField(default=False)
    
    def __str__(self):
        return self.gameName
    
class GroupGame(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    