from django.db import models


# Create your models here.
class Song(models.Model):
    title = models.CharField(255)

    def __str__(self):
        return self.title
