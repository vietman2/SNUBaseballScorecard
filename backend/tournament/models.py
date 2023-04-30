from django.db import models

# Create your models here.

class TournamentManager(models.Manager):
    def get_by_name(self, name):
        year = int(name.split('-')[0])
        type = name.split('-')[1]
        return Tournament.objects.get(year=year, type=type)

class Tournament(models.Model):
    year = models.IntegerField()
    type = models.CharField(max_length=3, choices=[('총장배', '총장배'), ('종체', '종체')])
    start_date = models.DateField()
    end_date = models.DateField()

    objects = TournamentManager()

    class Meta:
        unique_together = ('year', 'type')

    @property
    def name(self):
        return f"{self.year} {self.type}"
    
    @property
    def id(self):
        return f"{self.year%100} {self.type}"

    def __str__(self):
        return self.name
    
