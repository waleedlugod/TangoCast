from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, filters, viewsets
from rest_framework.parsers import JSONParser
from django_filters.rest_framework import DjangoFilterBackend
from .models import Podcast
from .serializers import PodcastSerializer


# Create your views here.
class PodcastSearch(generics.ListAPIView):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ["category"]
    search_fields = ["title"]


class GetPodcast(generics.RetrieveAPIView):
    queryset = Podcast.objects.all()
    lookup_field = "id"
    lookup_url_kwarg = "id"
    serializer_class = PodcastSerializer


class PodcastViewSet(viewsets.ModelViewSet):
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer
