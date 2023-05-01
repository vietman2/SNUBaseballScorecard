from rest_framework import serializers

from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'user_type')
        extra_kwargs = {'password':{'write_only':True, 'required':True}}

    def create(self, validated_data):
        user_type = validated_data.pop('user_type', 'normal')
        user = CustomUser.objects.create_user(user_type=user_type, **validated_data)
        return user
    
    def confirm_referee(self, obj: CustomUser):
        obj.is_referee = True
        obj.save()
        return obj