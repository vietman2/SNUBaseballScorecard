from django.db import models

from tournament.models import Tournament
from group.models import Group

# Create your models here.
class Team_RecordManager(models.Manager):
    def get_team_record(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        return team_record

class Team(models.Model):
    name = models.CharField(max_length=10, primary_key=True, unique=True)

    def __str__(self):
        return self.name
    
class Team_Record(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=10, null=True)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True, default=None, related_name='group')
    second_round = models.ForeignKey(Group, on_delete=models.CASCADE, null=True, default=None, related_name='second_round')
    captain_Name = models.CharField(max_length=10)
    captain_PhoneNumber = models.CharField(max_length=15)

    objects = Team_RecordManager()

    def __str__(self):
        return self.tournament.name + ' ' + self.team.name