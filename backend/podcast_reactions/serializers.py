from rest_framework import serializers
from .models import PodcastReaction


class PodcastReactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PodcastReaction
        fields = ["id", "user", "podcast", "reaction"]
