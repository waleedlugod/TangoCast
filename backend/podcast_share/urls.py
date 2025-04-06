from django.urls import path
from . import views

urlpatterns = [
    path("<uuid:id>/", views.GetPodcastShares.as_view(), name="get_podcast_shares"),
]
