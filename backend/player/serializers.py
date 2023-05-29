from rest_framework import serializers

from player.models import Player_Tournament

class PlayerInfosSerializer(serializers.ModelSerializer):
    student_id = serializers.SerializerMethodField()
    team_name = serializers.SerializerMethodField()
    name = serializers.SerializerMethodField()

    class Meta:
        model = Player_Tournament
        fields = ('id', 'name', 'team_name', 'student_id', 'college', 'department', 'status')
        
    def get_student_id(self, obj):
        return obj.player.student_id
    
    def get_name(self, obj):
        return obj.player.name

    def get_team_name(self, obj):
        return obj.team.name