from django.urls import path
from .views import share_podcast

urlpatterns = [
    path('<int:podcast_id>/share/', share_podcast, name='share_podcast'),
]