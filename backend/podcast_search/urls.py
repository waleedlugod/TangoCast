from django.urls import path

from . import views

urlpatterns = [
    path("", views.PodcastSearch.as_view(), name="podcast-search-view"),
    path("<uuid:id>/", views.GetPodcast.as_view(), name="get_podcast"),
]
