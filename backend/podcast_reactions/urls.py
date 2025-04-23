from django.urls import path
from .views import TogglePodcastReaction

urlpatterns = [
    path("react/<uuid:podcast_id>/", TogglePodcastReaction.as_view(), name="toggle-reaction"),
]
