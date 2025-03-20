from django.shortcuts import render
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Podcast
from .serializers import PodcastSerializer


# Create your views here.
class PodcastSearch(generics.ListAPIView):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ['title', 'description']