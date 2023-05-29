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

    def test_team_fields(self):
        test1 = Team.objects.get(name="서울대학교")
        test2 = Team.objects.get(name="고려대학교")

        self.assertEqual(test1.name, "서울대학교")
        self.assertEqual(test2.name, "고려대학교")

    def test_team_record_fields(self):
        t = Tournament.objects.get(year=2020, type="종체")
        team1 = Team.objects.get(name="서울대학교")
        team2 = Team.objects.get(name="고려대학교")
        test1 = Team_Record.objects.get(nickname="서울대")
        test2 = Team_Record.objects.get(nickname="고려대")

        self.assertEqual(test1.nickname, "서울대")
        self.assertEqual(test1.team, team1)
        self.assertEqual(test1.tournament, t)
        self.assertEqual(test1.captain_Name, "김서울")
        self.assertEqual(test1.captain_PhoneNumber, "010-1234-5678")
        self.assertEqual(test1.group.name, "A조")
        self.assertEqual(test1.second_round.name, "B조")
        self.assertEqual(str(test1), "2020 종체 서울대학교")
        self.assertEqual(str(team1), "서울대학교")

        self.assertEqual(test2.nickname, "고려대")
        self.assertEqual(test2.team, team2)
        self.assertEqual(test2.tournament, t)
        self.assertEqual(test2.captain_Name, "김고려")
        self.assertEqual(test2.captain_PhoneNumber, "010-1234-5678")

    def test_teams_by_tournament(self):
        response = self.client.get('/api/team/2020-종체/')
        team1 = Team.objects.get(name="서울대학교")
        team2 = Team.objects.get(name="고려대학교")
        self.assertEqual(response.status_code, 200)
        json = [{
                'id': 1,
                'team': team1.name,
                'tournament': 1,
                'nickname': '서울대',
                'group': 1,
                'second_round': 2,
                'captain_Name': '김서울',
                'captain_PhoneNumber': '010-1234-5678',
                'initial_registration': False,
                'num_players': 0
            },
            {
                'id': 2,
                'team': team2.name,
                'tournament': 1,
                'nickname': '고려대',
                'group': None,
                'second_round': None,
                'captain_Name': '김고려',
                'captain_PhoneNumber': '010-1234-5678',
                'initial_registration': False,
                'num_players': 0
            }]
        self.assertEqual(response.json(), json)

    def test_setGroup(self):
        response = self.client.put('/api/team/setGroup/2020-종체/고려대학교/A조/')
        group1 = Group.objects.get(name="A조")
        team1 = Team.objects.get(name="고려대학교")
        teamRecord1 = Team_Record.objects.get(team=team1)

        self.assertEqual(teamRecord1.group, group1)