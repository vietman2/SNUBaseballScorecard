from rest_framework import serializers

from team.models import Team_Record

class TeamInfosSerializer(serializers.ModelSerializer):
    num_players = serializers.SerializerMethodField()
    team_name = serializers.CharField(source='team.name')
    #num_wildcards = serializers.SerializerMethodField()
    #num_elites = serializers.SerializerMethodField()
    ## TODO: 와카, 선출 수 추가

    class Meta:
        model = Team_Record
        fields = ('id', 'team_name', 'nickname', 'captain_Name', 'captain_PhoneNumber', 'num_players', 'initial_registration')
    
    def get_num_players(self, obj):
        return obj.team_player.count()
    
    #def get_num_wildcards(self, obj):
    #    return obj.team_player.status.filter(status='와일드카드' | '휴학').count()
    
    #def get_num_elites(self, obj):
    #    return obj.team_player.player.elite.count()
