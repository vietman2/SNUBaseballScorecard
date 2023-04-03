from django.db import models

from tournament.models import Tournament

# Create your models here.

class Group(models.Model):
    name = models.CharField(max_length=10, primary_key=True, unique=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
