from rest_framework import serializers
from .models import Podcast

from user_management.models import UserModel, CreatorModel
from user_management.serializers import CreatorSerializer


class PodcastSerializer(serializers.ModelSerializer):
    creator = CreatorSerializer()
    creator_user_id = serializers.PrimaryKeyRelatedField(
        queryset=UserModel.objects.all(), write_only=True
    )

    class Meta:
        model = Podcast
        fields = "__all__"

    def create(self, validated_data):
        user = validated_data.pop("creator_user_id")
        creator = CreatorModel.objects.get(creator_id=user)
        return Podcast.objects.create(creator=creator, **validated_data)

    def update(self, instance, validated_data):
        user = validated_data.pop("creator_user_id")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if user:
            creator = CreatorModel.objects.get(creator_id=user)
            creator_serializer = CreatorSerializer(
                instance=creator, data=user, partial=self.partial
            )
            creator_serializer.is_valid(raise_exception=True)
            creator_serializer.save()

        return instance
