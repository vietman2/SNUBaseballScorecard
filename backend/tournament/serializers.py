from rest_framework import serializers

from tournament.models import Tournament

class SimpleTournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ('id', 'name', 'start_date', 'end_date')

class DetailedTournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ('id', 'name', 'start_date', 'end_date', 'winner', 'runner_up', 'third_place', 'mvp', 'batter_king', 'pitcher_king')
        depth = 1
