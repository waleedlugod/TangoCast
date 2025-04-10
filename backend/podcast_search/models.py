from django.db import models


# Create your models here.
class Podcast(models.Model):
    title = models.CharField(max_length=255, verbose_name="title")
    transcript = models.TextField(blank=True, default="")
    description = models.TextField(blank=True, default="")
    is_featured = models.BooleanField(default=False)
    audio = models.FileField(upload_to='audios/', null=True, blank=True)
    video = models.FileField(upload_to='videos/', null=True, blank=True)
    thumbnail = models.FileField(upload_to='photos/', null=True, blank=True)
    category = models.CharField(max_length=255, verbose_name="category", blank=True)
    views = models.BigIntegerField(blank=True)
    earnings = models.BigIntegerField(blank=True)

    def __str__(self):
        return self.title
