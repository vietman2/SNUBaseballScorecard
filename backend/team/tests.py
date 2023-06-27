from django.test import TestCase

from .models import Team, Team_Record
from tournament.models import Tournament
from group.models import Group

class TeamTestCase(TestCase):
    def setUp(self):
        t = Tournament.objects.create(year=2020, type="종체", start_date="2020-01-01", end_date="2020-01-02")
        team1 = Team.objects.create(name="서울대학교")
        team2 = Team.objects.create(name="고려대학교")
        group = Group.objects.create(tournament=t, name="A조")
        second_group = Group.objects.create(tournament=t, name="B조")
        Team_Record.objects.create(team=team1, tournament=t, nickname="서울대", group=group, second_round=second_group, captain_Name="김서울", captain_PhoneNumber="010-1234-5678")
        Team_Record.objects.create(team=team2, tournament=t, nickname="고려대", captain_Name="김고려", captain_PhoneNumber="010-1234-5678")
