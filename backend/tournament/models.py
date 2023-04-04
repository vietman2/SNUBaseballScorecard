from django.db import models

# Create your models here.

class Tournament(models.Model):
    year = models.IntegerField()
    type = models.CharField(max_length=3, choices=[('총장배', '총장배'), ('종체', '총장배')])
    start_date = models.DateField()
    end_date = models.DateField()

    class Meta:
        unique_together = ('year', 'type')

    @property
    def name(self):
        return self.year + ' ' + self.type

    @property
    def id(self):
        return (self.year%100) + ' ' + self.type

    def __str__(self):
        return self.name