from django.urls import path

from . import views

urlpatterns = [
    path("", views.PodcastSearch.as_view(), name="podcast-search-view"),
    path("podcast/<int:pk>", views.podcast_creator),
    path("create/", views.podcast_create),
]
