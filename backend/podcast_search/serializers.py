from rest_framework import serializers
from .models import Podcast

from user_management.models import UserModel, CreatorModel
from user_management.serializers import CreatorSerializer


class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = "__all__"
