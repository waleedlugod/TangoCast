from rest_framework import serializers
from .models import UserModel, CreatorModel, ListenerModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ["username", "email", "password", "role"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)
        return user


class CreatorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    profile_photo = serializers.ImageField()
    banner_photo = serializers.ImageField()
    role = serializers.CharField()
    bio = serializers.CharField()
    instagram_social = serializers.URLField()
    x_social = serializers.URLField()
    staff = serializers.CharField()

    class Meta:
        model = CreatorModel
        fields = [
            "id",
            "profile_photo",
            "banner_photo",
            "role",
            "bio",
            "instagram_social",
            "x_social",
            "staff",
        ]
