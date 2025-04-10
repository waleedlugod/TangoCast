from rest_framework import serializers
from .models import Podcast


class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = [
            "id",
            "creator",
            "title",
            "transcript",
            "description",
            "is_featured",
            "audio",
            "video",
            "thumbnail",
            "category",
        ]
