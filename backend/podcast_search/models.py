from django.db import models
import uuid


# Create your models here.
class Podcast(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    title = models.CharField(max_length=255, verbose_name="title")
    episode = models.CharField(
        max_length=255, verbose_name="episode", blank=True, default=""
    )
    episode_number = models.PositiveIntegerField(default=0)
    transcript = models.TextField(default="No transcript available.")
    description = models.TextField(default="No description available.")
    is_featured = models.BooleanField(default=False)
    audio = models.FileField(upload_to="audios/", null=True, blank=True)
    video = models.FileField(upload_to="videos/", null=True, blank=True)
    thumbnail = models.FileField(upload_to="photos/", null=True, blank=True)
    category = models.CharField(max_length=255, verbose_name="category", blank=True)
    is_public = models.BooleanField(default=False)

    def __str__(self):
        return self.title
