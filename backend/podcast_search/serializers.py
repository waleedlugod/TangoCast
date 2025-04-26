from rest_framework import serializers
from .models import Podcast
from user_management.serializers import CreatorSerializer
from user_management.models import CreatorModel


class PodcastSerializer(serializers.ModelSerializer):
    # allow creator information to be viewable
    creator = CreatorSerializer(read_only=True)
    # allow POST to reference a creator
    creator_id = serializers.PrimaryKeyRelatedField(
        queryset=CreatorModel.objects.all(), write_only=True
    )

    class Meta:
        model = Podcast
        fields = "__all__"
