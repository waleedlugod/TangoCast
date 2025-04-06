from rest_framework import serializers
from .models import SharedPodcast


class SharedPodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedPodcast
        fields = ["shared_by", "shared_at"]
