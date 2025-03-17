from django.db import models
from django.contrib.auth.models import User
from podcast_search.models import Podcast 
import uuid

class SharedPodcast(models.Model):
    podcast = models.ForeignKey(Podcast, on_delete=models.CASCADE)
    shared_by = models.ForeignKey(User, on_delete=models.CASCADE)
    shared_at = models.DateTimeField(auto_now_add=True)
    share_link = models.URLField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.share_link:
            self.share_link = f"https://yourdomain.com/podcast/{self.podcast.id}/shared/{uuid.uuid4()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.podcast.title} shared by {self.shared_by.username}"
