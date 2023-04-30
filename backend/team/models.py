from django.db import models

from tournament.models import Tournament
from group.models import Group

# Create your models here.

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

    def __str__(self):
        return self.tournament.name + ' ' + self.team.name