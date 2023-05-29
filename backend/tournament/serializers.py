from rest_framework import serializers

from tournament.models import Tournament

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ('id', 'name', 'start_date', 'end_date')