from django.test import TestCase
import datetime

from .models import Tournament

class TournamentTestCase(TestCase):
    def setUp(self):
        Tournament.objects.create(year=2023, type="총장배", start_date=datetime.date(2023, 1, 1), end_date=datetime.date(2023, 1, 2))
        Tournament.objects.create(year=2023, type="종체", start_date=datetime.date(2023, 1, 3), end_date=datetime.date(2023, 1, 4))

    def test_fields(self):
        test1 = Tournament.objects.get(year=2023, type="총장배")
        test2 = Tournament.objects.get(year=2023, type="종체")
        start1 = datetime.date(2023, 1, 1)
        end1 = datetime.date(2023, 1, 2)
        start2 = datetime.date(2023, 1, 3)
        end2 = datetime.date(2023, 1, 4)

        self.assertEqual(test1.year, 2023)
        self.assertEqual(test1.type, "총장배")
        self.assertEqual(test1.start_date, start1)
        self.assertEqual(test1.end_date, end1)

        self.assertEqual(test2.year, 2023)
        self.assertEqual(test2.type, "종체")
        self.assertEqual(test2.start_date, start2)
        self.assertEqual(test2.end_date, end2)

    def test_name(self):
        test1 = Tournament.objects.get(year=2023, type="총장배")
        test2 = Tournament.objects.get(year=2023, type="종체")

        self.assertEqual(test1.name, "2023 총장배")
        self.assertEqual(test2.name, "2023 종체")

    def test_code(self):
        test1 = Tournament.objects.get(year=2023, type="총장배")
        test2 = Tournament.objects.get(year=2023, type="종체")

        self.assertEqual(test1.code, "23 총장배")
        self.assertEqual(test2.code, "23 종체")

    def test_get_by_name(self):
        test1 = Tournament.objects.get(year=2023, type="총장배")
        test2 = Tournament.objects.get(year=2023, type="종체")

        self.assertEqual(Tournament.objects.get_by_name("2023-총장배"), test1)
        self.assertEqual(Tournament.objects.get_by_name("2023-종체"), test2)

    def test_str(self):
        test1 = Tournament.objects.get(year=2023, type="총장배")
        test2 = Tournament.objects.get(year=2023, type="종체")

        self.assertEqual(str(test1), "2023 총장배")
        self.assertEqual(str(test2), "2023 종체")

    def test_unique_together(self):
        with self.assertRaises(Exception):
            Tournament.objects.create(year=2023, type="총장배", start_date=datetime.date(2023, 1, 1), end_date=datetime.date(2023, 1, 2))

    def test_names(self):
        response = self.client.get('/api/tournament/names/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'names': ['2023 종체', '2023 총장배']})