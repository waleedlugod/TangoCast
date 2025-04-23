from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from podcast_search.models import Podcast
from .models import PodcastReaction


class TogglePodcastReaction(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, podcast_id):
        reaction_type = request.data.get("reaction")

        if reaction_type not in [PodcastReaction.LIKE, PodcastReaction.DISLIKE]:
            return Response({"error": "Invalid reaction type"}, status=400)

        try:
            podcast = Podcast.objects.get(id=podcast_id)
        except Podcast.DoesNotExist:
            return Response({"error": "Podcast not found"}, status=404)

        reaction, created = PodcastReaction.objects.get_or_create(
            user=request.user, podcast=podcast
        )

        if not created:
            if reaction.reaction == reaction_type:
                reaction.delete()
                return Response({"message": "Reaction removed"}, status=200)
            else:
                reaction.reaction = reaction_type
                reaction.save()
                return Response({"message": "Reaction updated"}, status=200)

        reaction.reaction = reaction_type
        reaction.save()
        return Response({"message": "Reaction added"}, status=201)

