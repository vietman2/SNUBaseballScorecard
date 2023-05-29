from django.db import models

from tournament.models import Tournament
from team.models import Team_Record
from .managers import GroupManager, Team_Group_StatsManager

# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=10)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament')

    objects = GroupManager()
    
    class Meta:
        unique_together = ('name', 'tournament')

    def __str__(self):
        return self.name

class Team_Group_Stats(models.Model):
    ## Information
    team_record = models.ForeignKey(Team_Record, on_delete=models.CASCADE, related_name='team_record')
    
    ## Stats
    num_games = models.IntegerField(default=0)
    win = models.IntegerField(default=0)
    loss = models.IntegerField(default=0)
    draw = models.IntegerField(default=0)

    ## Detailed Stats
    attack_innings = models.FloatField(default=0)
    defense_innings = models.FloatField(default=0)
    runs_earned = models.IntegerField(default=0)
    runs_given = models.IntegerField(default=0)

    objects = Team_Group_StatsManager()
