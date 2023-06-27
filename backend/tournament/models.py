from django.db import models

# Create your models here.

class TournamentManager(models.Manager):
    def get_by_name(self, name):
        year = int(name.split(' ')[0])
        type = name.split(' ')[1]
        return Tournament.objects.get(year=year, type=type)
    
class Tournament(models.Model):
    year = models.IntegerField()
    type = models.CharField(max_length=3, choices=[('총장배', '총장배'), ('종체', '종체')])
    start_date = models.DateField()
    end_date = models.DateField()

    winner = models.OneToOneField('team.Team', on_delete=models.SET_NULL, null=True, blank=True, related_name='winner')
    runner_up = models.OneToOneField('team.Team', on_delete=models.SET_NULL, null=True, blank=True, related_name='runner_up')
    third_place = models.OneToOneField('team.Team', on_delete=models.SET_NULL, null=True, blank=True, related_name='third_place')
    mvp = models.OneToOneField('player.Player', on_delete=models.SET_NULL, null=True, blank=True, related_name='mvp')
    batter_king = models.OneToOneField('player.Player', on_delete=models.SET_NULL, null=True, blank=True, related_name='batter_king')
    pitcher_king = models.OneToOneField('player.Player', on_delete=models.SET_NULL, null=True, blank=True, related_name='pitcher_king')

    objects = TournamentManager()

    class Meta:
        unique_together = ('year', 'type')

    @property
    def name(self):
        return f"{self.year} {self.type}"
    
    @property
    def code(self):
        return f"{self.year%100} {self.type}"

    def __str__(self):
        return self.name
    
