from django.db import models

from tournament.models import Tournament
from account.models import CustomUser

# Create your models here.

class Referee(models.Model):
    referee = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('referee', 'tournament')

    def __str__(self):
        return self.referee.name + ' ' + self.tournament.name
    