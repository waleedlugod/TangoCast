from django.db import models
from django.contrib.auth.models import AbstractUser

from podcast_search.models import Podcast


class UserModel(AbstractUser):
    ROLE_CHOICES = (
        ("listenerUser", "Listener"),
        ("creatorUser", "Creator"),
        ("administrator", "Admin"),
    )
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="listenerUser")
    user_id = models.BigAutoField(primary_key=True)
    profile_photo = models.ImageField(upload_to="photos/", null=True, blank=True)
    banner_photo = models.ImageField(upload_to="photos/", null=True, blank=True)
    bio = models.TextField(blank=True)
    instagram_social = models.URLField()
    x_social = models.URLField()


class CreatorModel(AbstractUser):
    creator_id = models.ForeignKey(
        UserModel,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="creator",
    )
    staff = models.TextField()


class ListenerModel(AbstractUser):
    listener_id = models.ForeignKey(
        UserModel, on_delete=models.CASCADE, related_name="listener"
    )
    follows = models.ForeignKey(
        CreatorModel, on_delete=models.SET_NULL, related_name="creator"
    )
