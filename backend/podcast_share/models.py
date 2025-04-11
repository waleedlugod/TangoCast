from django.db import models
from podcast_search.models import Podcast
from user_management.models import UserModel


class SharedPodcast(models.Model):
    podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE)
    shared_by = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    shared_at = models.DateTimeField(auto_now_add=True)

    def get_share_link(self):
        return f"http://127.0.0.1:8000/podcast/{self.podcast.id}"

    def __str__(self):
        return f"{self.podcast.title} shared by {self.shared_by.username}"
