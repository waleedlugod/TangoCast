from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.shortcuts import get_object_or_404
from podcast_search.models import Podcast 

@login_required
def share_podcast(request, podcast_id):
    podcast = get_object_or_404(Podcast, id=podcast_id)
    share_link = request.build_absolute_uri(f"/podcasts/{podcast_id}/")
    return JsonResponse({'share_link': share_link})
