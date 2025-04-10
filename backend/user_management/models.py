from django.db import models
from django.contrib.auth.models import AbstractUser


class UserModel(AbstractUser):
    ROLE_CHOICES = (
        ("listenerUser", "Listener"),
        ("creatorUser", "Creator"),
        ("administrator", "Admin"),
    )
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="listenerUser")
    profile_photo = models.ImageField(upload_to="photos/", null=True, blank=True)
    banner_photo = models.ImageField(upload_to="photos/", null=True, blank=True)
    bio = models.TextField(blank=True)
    instagram_social = models.URLField(null=True, blank=True)
    x_social = models.URLField(null=True, blank=True)


class CreatorModel(models.Model):
    creator_id = models.OneToOneField(
        UserModel, on_delete=models.CASCADE, related_name="creator"
    )
    staff = models.TextField()


class ListenerModel(UserModel):
    listener_id = models.OneToOneField(
        UserModel, on_delete=models.CASCADE, related_name="listener"
    )
    follows = models.ForeignKey(
        CreatorModel,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="creator",
    )
