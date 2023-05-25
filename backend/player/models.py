from django.db import models

# Create your models here.

class Player(models.Model):
    student_id = models.CharField(max_length=10, primary_key=True, unique=True)
    second_id = models.CharField(max_length=10, null=True)
    name = models.CharField(max_length=10)
    elite = models.BooleanField(default=False)
    
class Player_Tournament(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    team = models.ForeignKey('team.Team_Record', on_delete=models.CASCADE, related_name='team_player')
    college = models.CharField(max_length=20)
    department = models.CharField(max_length=20)
    status = models.CharField(max_length=5, choices=[
        ('학부', '학부'), ('대학원', '대학원'), ('교직원', '교직원'), ('연구원', '연구원'), ('교수', '교수'), ('와일드카드', '와일드카드'), ('휴학', '휴학')
    ])

class Player_Batting_Record(models.Model):
    player = models.ForeignKey(Player_Tournament, on_delete=models.CASCADE)

    games = models.IntegerField(default=0)
    plate_appearances = models.IntegerField(default=0)
    at_bats = models.IntegerField(default=0)

    single = models.IntegerField(default=0)
    double = models.IntegerField(default=0)
    triple = models.IntegerField(default=0)
    home_run = models.IntegerField(default=0)

    walks = models.IntegerField(default=0)
    hit_by_pitch = models.IntegerField(default=0)
    intentional_walks = models.IntegerField(default=0)

    strikeouts = models.IntegerField(default=0)
    sacrifice_hits = models.IntegerField(default=0)
    sacrifice_flies = models.IntegerField(default=0)

    runs = models.IntegerField(default=0)
    RBIs = models.IntegerField(default=0)
    steals = models.IntegerField(default=0)
    caught_steals = models.IntegerField(default=0)

    errors = models.IntegerField(default=0)

class Player_Pitching_Record(models.Model):
    player = models.ForeignKey(Player_Tournament, on_delete=models.CASCADE)

    games = models.IntegerField(default=0)
    games_started = models.IntegerField(default=0)
    complete_games = models.IntegerField(default=0)
    shutouts = models.IntegerField(default=0)

    wins = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)
    saves = models.IntegerField(default=0)

    innings_pitched = models.FloatField(default=0)
    batters_faced = models.IntegerField(default=0)
    pitches_thrown = models.IntegerField(default=0)

    hits_allowed = models.IntegerField(default=0)
    home_runs_allowed = models.IntegerField(default=0)
    walks_allowed = models.IntegerField(default=0)
    hit_by_pitch = models.IntegerField(default=0)

    strikeouts = models.IntegerField(default=0)
    wild_pitches = models.IntegerField(default=0)
    balks = models.IntegerField(default=0)

    runs_allowed = models.IntegerField(default=0)
    earned_runs_allowed = models.IntegerField(default=0)
