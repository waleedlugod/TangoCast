from django.db import models


# Create your models here.
class Podcast(models.Model):
    title = models.CharField(255)
    transcript = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    is_featured = models.BooleanField(default=False)
    audio = models.FileField(upload_to='audio/', null=True, blank=True)
    video = models.FileField(upload_to='videos/', null=True, blank=True)

    def __str__(self):
        return self.title
