from rest_framework import serializers
from .models import UserModel, CreatorModel, ListenerModel


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)

        role = validated_data.get("role")
        if role == "creatorUser":
            CreatorModel.objects.create(creator_id=user)

        return user


class CreatorSerializer(serializers.ModelSerializer):
    id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(), write_only=True
    )
    creator_id = UserSerializer(read_only=True)
    username = serializers.CharField(source="creator_id.username")
    email = serializers.EmailField(source="creator_id.email")
    profile_photo = serializers.ImageField(
        source="creator_id.profile_photo", allow_empty_file=True, required=False
    )
    banner_photo = serializers.ImageField(
        source="creator_id.banner_photo", allow_empty_file=True, required=False
    )
    bio = serializers.CharField(source="creator_id.bio", required=False)
    instagram_social = serializers.URLField(
        source="creator_id.instagram_social", required=False
    )
    x_social = serializers.URLField(source="creator_id.x_social", required=False)
    followers = serializers.IntegerField(source="creator_id.followers", required=False)
    staff = serializers.CharField(required=False)

    class Meta:
        model = CreatorModel
        fields = [
            "id",
            "creator_id",
            "username",
            "email",
            "profile_photo",
            "banner_photo",
            "bio",
            "instagram_social",
            "x_social",
            "followers",
            "staff",
        ]
