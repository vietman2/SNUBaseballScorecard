from django.db import models

from tournament.models import Tournament

# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=10)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'tournament')

    def __str__(self):
        return self.name
    
