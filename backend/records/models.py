from django.db import models

from tournament.models import Tournament
from group.models import Group
from team.models import Team_Record

# Create your models here.

class Team_Group_StatsManager(models.Manager):
    def getWins(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        team_group_stats = Team_Group_Stats.objects.get(team_record=team_record, group=team_record.group)
        return team_group_stats.win
    
    def getLosses(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        team_group_stats = Team_Group_Stats.objects.get(team_record=team_record, group=team_record.group)
        return team_group_stats.loss
    
    def getDraws(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        team_group_stats = Team_Group_Stats.objects.get(team_record=team_record, group=team_record.group)
        return team_group_stats.draw
    
    def getNumGames(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        team_group_stats = Team_Group_Stats.objects.get(team_record=team_record, group=team_record.group)
        return team_group_stats.num_games
    
    def getRunsEarned(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        team_group_stats = Team_Group_Stats.objects.get(team_record=team_record, group=team_record.group)
        return team_group_stats.runs_earned
    
    def getRunsGiven(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        team_group_stats = Team_Group_Stats.objects.get(team_record=team_record, group=team_record.group)
        return team_group_stats.runs_given
    
    def getWinningPercentage(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        team_group_stats = Team_Group_Stats.objects.get(team_record=team_record, group=team_record.group)
        if team_group_stats.num_games == 0:
            return 0
        return team_group_stats.win / team_group_stats.num_games
    
    def getRunsEarnedPerGame(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        team_group_stats = Team_Group_Stats.objects.get(team_record=team_record, group=team_record.group)
        if team_group_stats.num_games == 0:
            return 0
        return team_group_stats.runs_earned / team_group_stats.num_games
    
    def getRunsGivenPerGame(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        team_record = Team_Record.objects.get(tournament=t, team__name=name)
        team_group_stats = Team_Group_Stats.objects.get(team_record=team_record, group=team_record.group)
        if team_group_stats.num_games == 0:
            return 0
        return team_group_stats.runs_given / team_group_stats.num_games
   
class Team_Group_Stats(models.Model):
    team_record = models.ForeignKey(Team_Record, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    num_games = models.IntegerField(default=0)
    win = models.IntegerField(default=0)
    loss = models.IntegerField(default=0)
    draw = models.IntegerField(default=0)
    runs_earned = models.IntegerField(default=0)
    runs_given = models.IntegerField(default=0)

    objects = Team_Group_StatsManager()