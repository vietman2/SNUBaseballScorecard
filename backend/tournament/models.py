from django.db import models

# Create your models here.

class Tournament(models.Model):
    year = models.IntegerField()
    type = models.CharField(max_length=5, choices=[('총장배'), ('종체')])
    start_date = models.DateField()
    end_date = models.DateField()
