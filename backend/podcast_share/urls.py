from django.urls import path
from . import views

urlpatterns = [
    path("<uuid:id>/", views.GetPodcastShares.as_view(), name="get_podcast_shares"),
    path(
        "shared/<uuid:id>/",
        views.CreatePodcastShare.as_view(),
        name="get_podcast_shares",
    ),
]
