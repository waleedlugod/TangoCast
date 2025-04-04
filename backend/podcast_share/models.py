from django.db import models
from podcast_search.models import Podcast
import uuid
from django.conf import settings

class SharedPodcast(models.Model):
    podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE)
    shared_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    shared_at = models.DateTimeField(auto_now_add=True)
    share_uuid = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)

    def get_share_link(self):
        return f"http://127.0.0.1:8000/podcast/{self.podcast.id}/share/{self.share_uuid}"

    def __str__(self):
        return f"{self.podcast.title} shared by {self.shared_by.username}"
