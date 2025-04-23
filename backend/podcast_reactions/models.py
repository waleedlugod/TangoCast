from django.db import models
from user_management.models import UserModel
from podcast_search.models import Podcast


class PodcastReaction(models.Model):
    LIKE = "like"
    DISLIKE = "dislike"

    REACTION_CHOICES = [
        (LIKE, "Like"),
        (DISLIKE, "Dislike"),
    ]

    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE)
    reaction = models.CharField(max_length=7, choices=REACTION_CHOICES)

    class Meta:
        unique_together = ("user", "podcast")  # One reaction per podcast per user

    def __str__(self):
        return f"{self.user.username} {self.reaction}d {self.podcast.title}"
