from django.shortcuts import render
from rest_framework import generics
from .models import Song
from .serializers import SongSerializer


# Create your views here.
class SongSearch(generics.ListAPIView):
    serializer_class = SongSerializer

    def get_queryset(self):
        return Song.objects.filter(title__iexact=self.kwargs["title"])
