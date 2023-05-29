from rest_framework import serializers

from team.models import Team, Team_Record

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'name')

class TeamRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team_Record
        fields = ('id', 'team', 'tournament', 'nickname', 'group',
                  'second_round', 'captain_Name', 'captain_PhoneNumber',
                  'initial_registration')

class TeamRecordListSerializer(serializers.ModelSerializer):
    num_players = serializers.SerializerMethodField()

    class Meta:
        model = Team_Record
        fields = ('id', 'team', 'tournament', 'nickname', 'group',
                  'second_round', 'captain_Name', 'captain_PhoneNumber',
                  'initial_registration', 'num_players')
    
    def get_num_players(self, obj):
        return obj.team_player.count()