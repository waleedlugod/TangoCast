from django.db import models
from django.contrib.auth.models import AbstractUser


class UserModel(AbstractUser):
    ROLE_CHOICES = (
        ('listenerUser', 'Listener'), 
        ('creatorUser', 'Creator'), 
        ('administrator', 'Admin'),
    )
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='listenerUser')