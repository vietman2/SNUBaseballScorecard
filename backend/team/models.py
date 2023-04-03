from django.db import models

from tournament.models import Tournament
from group.models import Group

# Create your models here.

class Team(models.Model):
    name = models.CharField(max_length=10, primary_key=True, unique=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.SET_NULL, null=True)
    captain_Name = models.CharField(max_length=10)
    captain_PhoneNumber = models.CharField(max_length=15)
    