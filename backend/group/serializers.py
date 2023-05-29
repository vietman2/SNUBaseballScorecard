from rest_framework import serializers

from group.models import Group, Team_Group_Stats

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'tournament')

class GroupStatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team_Group_Stats
        fields = ('id', 'team_record', 'num_games',
                  'win', 'loss', 'draw', 'attack_innings',
                  'defense_innings', 'runs_earned', 'runs_given')