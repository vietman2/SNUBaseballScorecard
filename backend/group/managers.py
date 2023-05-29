from django.db import models
from django.apps import apps

class GroupManager(models.Manager):
    def get_group(self, tournament, name):
        Tournament = apps.get_model('tournament', 'Tournament')
        Group = apps.get_model('group', 'Group')

        t = Tournament.objects.get_by_name(tournament)
        group = Group.objects.get(tournament=t, name=name)
        return group
    
class Team_Group_StatsManager(models.Manager):
    pass