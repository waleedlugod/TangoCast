from rest_framework import serializers
from .models import UserModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name', 
            'profile_picture', 'date_joined', 'last_login', 'role', 
            'is_active', 'password'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)
        return user