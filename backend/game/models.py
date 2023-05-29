from django.db import models

from team.models import Team_Record
from tournament.models import Tournament
from player.models import Player_Tournament
from referee.models import Referee
from .managers import GameManager

# Create your models here.

class Game(models.Model):
    ## Information
    game_name = models.CharField(max_length=10)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='tournament_game')
    group_game = models.BooleanField(default=False)
    game_date_time = models.DateTimeField()
    team1 = models.ForeignKey(Team_Record, on_delete=models.DO_NOTHING, related_name='team1')
    team2 = models.ForeignKey(Team_Record, on_delete=models.DO_NOTHING, related_name='team2')
    team1_home = models.BooleanField(default=False)
    done = models.BooleanField(default=False)
    forfeit = models.BooleanField(default=False)

    ## Referees
    main = models.ForeignKey(Referee, on_delete=models.DO_NOTHING, related_name='main')
    first_base = models.ForeignKey(Referee, on_delete=models.DO_NOTHING, related_name='first_base')
    third_base = models.ForeignKey(Referee, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='third_base')
    record_keeper = models.ForeignKey(Referee, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='record_keeper')

    objects = GameManager()
    
    def __str__(self):
        return f'{self.tournament.name} {self.gameName}'
    
class Player_Game(models.Model):
    class PlayerPositions(models.TextChoices):
        PITCHER = 'P', 'Pitcher'
        CATCHER = 'C', 'Catcher'
        FIRST_BASE = '1B', 'First Baseman'
        SECOND_BASE = '2B', 'Second Baseman'
        THIRD_BASE = '3B', 'Third Baseman'
        SHORTSTOP = 'SS', 'Shortstop'
        LEFT_FIELD = 'LF', 'Left Fielder'
        CENTER_FIELD = 'CF', 'Center Fielder'
        RIGHT_FIELD = 'RF', 'Right Fielder'
        DESIGNATED_HITTER = 'DH', 'Designated Hitter'

    ## Information
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='game_playerGame')
    player = models.ForeignKey(Player_Tournament, on_delete=models.CASCADE, related_name='player_playerGame')
    position = models.CharField(max_length=3, choices=PlayerPositions.choices)
    order = models.IntegerField(default=0)  ## 0 if not in starting lineup, 1-9 if in starting lineup, 10 if only pitching
    subbed_out = models.BooleanField(default=False)

    ## Batting Stats
    plate_appearances = models.IntegerField(default=0)
    at_bats = models.IntegerField(default=0)
    runs = models.IntegerField(default=0)
    hits = models.IntegerField(default=0)
    RBIs = models.IntegerField(default=0)
    home_runs = models.IntegerField(default=0)
    strikeouts = models.IntegerField(default=0)
    walks = models.IntegerField(default=0)

    ## Pitching Stats
    innings_pitched = models.FloatField(default=0)
    hits_allowed = models.IntegerField(default=0)
    runs_allowed = models.IntegerField(default=0)
    earned_runs = models.IntegerField(default=0)
    walks_allowed = models.IntegerField(default=0)
    strikeouts_thrown = models.IntegerField(default=0)
    home_runs_allowed = models.IntegerField(default=0)
    batters_faced = models.IntegerField(default=0)
    pitches_thrown = models.IntegerField(default=0)


    def __str__(self):
        return f'{self.name} ({self.get_position_display()})'
    
class Order(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    home = models.BooleanField(default=False)
    
    ## Starting Lineup
    batter1 = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='batter1')
    batter2 = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='batter2')
    batter3 = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='batter3')
    batter4 = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='batter4')
    batter5 = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='batter5')
    batter6 = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='batter6')
    batter7 = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='batter7')
    batter8 = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='batter8')
    batter9 = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='batter9')
    startingPitcher = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, related_name='startingPitcher')

    ## Bench
    bench = models.ManyToManyField(Player_Game, related_name='bench')

    def __str__(self):
        home = 'Home' if self.home else 'Away'
        return f'{self.game.tournament} {self.game.gameName} {home} Starting Lineup'

class Records(models.Model):
    ## Information
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='game_records')
    top_innings = models.IntegerField(default=0)
    bottom_innings = models.IntegerField(default=0)

    ## Main Stats
    top_runs = models.IntegerField(default=0)
    bottom_runs = models.IntegerField(default=0)
    top_hits = models.IntegerField(default=0)
    bottom_hits = models.IntegerField(default=0)
    top_errors = models.IntegerField(default=0)
    bottom_errors = models.IntegerField(default=0)
    top_BBs = models.IntegerField(default=0)
    bottom_BBs = models.IntegerField(default=0)

    ## Pitching Stats
    top_IP = models.FloatField(default=0)
    bottom_IP = models.FloatField(default=0)

    winning_pitcher = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='winningPitcher')
    losing_pitcher = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='losingPitcher')
    save_pitcher = models.ForeignKey(Player_Game, on_delete=models.DO_NOTHING, null=True, blank=True, related_name='savePitcher')

class Simple_Record(models.Model):
    ## Information
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    
    ## Runs
    top_runs = models.TextField(default='0,0,0,0,0,0,0')
    bottom_runs = models.TextField(default='0,0,0,0,0,0,0') 

    ## Hits
    top_hits_per_batter = models.TextField(default='')
    bottom_hits_per_batter = models.TextField(default='')

    ## Strikeouts
    top_strikeouts_per_pitcher = models.TextField(default='')
    bottom_strikeouts_per_pitcher = models.TextField(default='')

class Inning(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='game_inning')
    inning_number = models.IntegerField(default=0)
    top = models.BooleanField(default=True)
    runs = models.IntegerField(default=0)

class At_Bat(models.Model):
    inning = models.ForeignKey(Inning, on_delete=models.CASCADE, related_name='inning_at_bat')

    logs = models.TextField(default='')