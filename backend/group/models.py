from django.db import models

from tournament.models import Tournament

# Create your models here.

class GroupManager(models.Manager):
    def get_group(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        group = Group.objects.get(tournament=t, name=name)
        return group

class Group(models.Model):
    name = models.CharField(max_length=10)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)

    objects = GroupManager()
    
    class Meta:
        unique_together = ('name', 'tournament')

    def __str__(self):
        return self.name
    
