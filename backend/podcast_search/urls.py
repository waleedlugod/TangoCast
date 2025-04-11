from django.urls import path

from . import views

urlpatterns = [
    path("", views.PodcastSearch.as_view(), name="podcast-search-view"),
    path("creator/<int:pk>/", views.podcast_creator),
    path("<int:pk>/", views.podcast_detail),
    path("podcasts/", views.podcast_list),
    path("<uuid:id>/", views.GetPodcast.as_view(), name="get_podcast"),
]
