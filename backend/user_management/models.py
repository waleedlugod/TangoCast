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
    followers = models.BigIntegerField(blank=True, default=0)


class CreatorModel(models.Model):
    # TODO: need to change to foreign key
    creator_id = models.OneToOneField(
        UserModel, on_delete=models.CASCADE, related_name="creator", primary_key=True
    )
    staff = models.TextField(blank=True)

    class Meta:
        verbose_name = "creator"
        verbose_name_plural = "creators"


class ListenerModel(UserModel):
    # TODO: need to change to foreign key
    listener_id = models.OneToOneField(
        UserModel, on_delete=models.CASCADE, related_name="listener"
    )
    follows = models.ForeignKey(
        CreatorModel,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="follows",
    )

    class Meta:
        verbose_name = "listener"
        verbose_name_plural = "listeners"
