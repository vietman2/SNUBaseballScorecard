from django.db import models

from tournament.models import Tournament
from team.models import Team_Record

# Create your models here.

class GroupManager(models.Manager):
    def get_group(self, tournament, name):
        t = Tournament.objects.get_by_name(tournament)
        group = Group.objects.get(tournament=t, name=name)
        return group

class Group(models.Model):
    name = models.CharField(max_length=10)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament')

    objects = GroupManager()
    
    class Meta:
        unique_together = ('name', 'tournament')

    def __str__(self):
        return self.name
    
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
