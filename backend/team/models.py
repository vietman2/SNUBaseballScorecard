from django.db import models

from tournament.models import Tournament
from player.models import Player_Tournament

# Create your models here.
class Team_RecordManager(models.Manager):
    def get_team_record(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        return team_record
    
    def get_player_num(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        
        Player_Tournament.objects.get_queryset().filter(team=team_record).count()
     
class Team(models.Model):
    name = models.CharField(max_length=10, primary_key=True, unique=True)

    def __str__(self):
        return self.name
    
class Team_Record(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=10, null=True)
    group = models.ForeignKey('group.Group', on_delete=models.CASCADE, null=True, default=None, related_name='group')
    second_round = models.ForeignKey('group.Group', on_delete=models.CASCADE, null=True, default=None, related_name='second_round')
    captain_Name = models.CharField(max_length=10)
    captain_PhoneNumber = models.CharField(max_length=15)
    initial_registration = models.BooleanField(default=False)

    objects = Team_RecordManager()

    def __str__(self):
        return self.tournament.name + ' ' + self.team.name
    
