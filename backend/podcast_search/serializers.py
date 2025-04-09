from rest_framework import serializers
from .models import Podcast


class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = [
            "id",
            "title",
            "episode",
            "episode_number",
            "transcript",
            "description",
            "is_featured",
            "audio",
            "video",
            "thumbnail",
            "category",
            "is_public",
        ]
