from django.db import models


# Create your models here.
class Podcast(models.Model):
    title = models.CharField(255)

    def __str__(self):
        return self.title
