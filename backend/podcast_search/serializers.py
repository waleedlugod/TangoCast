from rest_framework import serializers
from .models import Podcast


class PodcastSerializer(serializers.ModelSerializer):
    class Meta:
        model = Podcast
        fields = "__all__"
