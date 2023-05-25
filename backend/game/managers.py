from django.db import models

class GameManager(models.Manager):
    def get_games_by_tournament(self, tournament):
        pass