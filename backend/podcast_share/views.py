from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from .models import SharedPodcast
from podcast_search.models import Podcast
from rest_framework import generics
from podcast_search import serializers

@login_required
def share_podcast(request, podcast_id):
    podcast = get_object_or_404(Podcast, id=podcast_id)

    shared_podcast, created = SharedPodcast.objects.get_or_create(
        podcast=podcast,
        shared_by=request.user
    )

    return JsonResponse({'share_link': shared_podcast.share_link})

def get_shared_podcast(request, podcast_id, share_uuid):
    shared_podcast = get_object_or_404(SharedPodcast, podcast__id=podcast_id, share_uuid=share_uuid)
    
    return JsonResponse({
        'podcast_id': shared_podcast.podcast.id,
        'title': shared_podcast.podcast.title,
        'share_link': shared_podcast.share_link,
        'shared_by': shared_podcast.shared_by.username,
        'shared_at': shared_podcast.shared_at.strftime('%Y-%m-%d %H:%M:%S')
    })

class GetPodcast(generics.RetrieveAPIView):
    queryset = Podcast.objects.all()
    lookup_field = "id"
    lookup_url_kwarg = "id"
    serializer_class = serializers.PodcastSerializer