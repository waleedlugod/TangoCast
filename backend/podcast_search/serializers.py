from rest_framework import serializers
from .models import Podcast

from user_management.models import UserModel, CreatorModel
from user_management.serializers import CreatorSerializer


class PodcastSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer(read_only=True)
    creator_user_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(), write_only=True
    )

    class Meta:
        model = Podcast
        fields = [
            "id",
            "creator",
            "creator_user_id",
            "title",
            "transcript",
            "description",
            "is_featured",
            "audio",
            "video",
            "thumbnail",
            "category",
            "views",
            "earnings"
        ]

    def create(self, validated_data):
        user = validated_data.pop("creator_user_id")
        creator = CreatorModel.objects.get(creator_id=user)
        return Podcast(creator=creator, **validated_data)
