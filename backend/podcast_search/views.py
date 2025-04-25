from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, filters, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from .models import Podcast
from .serializers import PodcastSerializer
from user_management.models import CreatorModel
from user_management.serializers import CreatorSerializer


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
    authentication_classes = [JWTAuthentication]
    permision_classes = [IsAuthenticated]
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer


class CreatorPodcastViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permision_classes = [IsAuthenticated]
    queryset = CreatorModel.objects.all()
    serializer_class = CreatorSerializer

    @action(detail=True, methods=["get", "post"])
    def podcasts(self, request, pk=None):
        try:
            creator = self.get_object()
        except CreatorModel.DoesNotExist:
            raise NotFound("Creator not found")

        if request.method == "GET":
            podcasts = (
                Podcast.objects.filter(creator=creator).order_by("-views")
            )
            serializer = PodcastSerializer(podcasts, many=True)
            return JsonResponse(serializer.data, safe=False)

        if request.method == "POST":
            serializer = PodcastSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save(creator=creator)
            return JsonResponse(serializer.data, status=201)
