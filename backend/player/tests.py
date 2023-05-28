from django.test import TestCase

from .models import Team, Team_Record
from tournament.models import Tournament
from group.models import Group

class PlayerTestCase(TestCase):
    def setUp(self):
        pass