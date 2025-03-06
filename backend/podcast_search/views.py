from django.shortcuts import render
from rest_framework import generics
from .models import Podcast
from .serializers import PodcastSerializer


# Create your views here.
class PodcastSearch(generics.ListAPIView):
    serializer_class = PodcastSerializer

    def get_queryset(self):
        return Podcast.objects.filter(title__iexact=self.kwargs["title"])
