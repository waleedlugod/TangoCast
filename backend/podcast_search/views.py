from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, filters
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


@csrf_exempt
def podcast_creator(request, pk):
    if request.method == "GET": 
        podcasts = Podcast.objects.filter(creator__creator_id__id=pk)
        serializer = PodcastSerializer(podcasts, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def podcast_list(request):
    if request.method == "POST":
        data = JSONParser().parse(request)
        serializer = PodcastSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == "DELETE":
        for podcast in Podcast.objects.all():
            podcast.delete()
        return HttpResponse(status=204)