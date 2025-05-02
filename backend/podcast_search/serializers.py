from rest_framework import serializers
from .models import Podcast
from user_management.serializers import CreatorSerializer
from user_management.models import CreatorModel, UserModel


class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = "__all__"

    creator = CreatorSerializer(read_only=True)
    creator_id = serializers.PrimaryKeyRelatedField(
        queryset=CreatorModel.objects.all(), write_only=True
    )

    def create(self, validated_data):
        user = validated_data.pop("creator_id")
        creator = CreatorModel.objects.get(creator_id=user)
        return Podcast.objects.create(creator=creator, **validated_data)

    def update(self, instance, validated_data):
        user = validated_data.pop("creator_id")
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if user:
            creator = CreatorModel.objects.get(creator_id=user)
            instance.creator = creator
            instance.save()
        return instance
