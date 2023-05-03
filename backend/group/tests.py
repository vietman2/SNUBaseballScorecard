from django.test import TestCase

from .models import Group
from tournament.models import Tournament

# Create your tests here.
class GroupTestCase(TestCase):
    def setUp(self):
        t = Tournament.objects.create(year=2020, type="종체", start_date="2020-01-01", end_date="2020-01-02")
        Group.objects.create(name="A조", tournament=t)

    def test_group_fields(self):
        test = Group.objects.get(name="A조")
        self.assertEqual(test.name, "A조")
        self.assertEqual(str(test), "A조")
        self.assertEqual(test.tournament.year, 2020)

    def test_groups_by_tournament(self):
        response = self.client.get('/api/group/2020-종체/')
        self.assertEqual(response.status_code, 200)
        json = [{
                'id': 1,
                'name': 'A조',
                'tournament_id': 1,
                }]
        self.assertEqual(response.json(), json)