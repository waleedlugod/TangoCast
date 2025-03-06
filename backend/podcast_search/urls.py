from django.urls import path

from . import views

urlpatterns = [
    path("<str:title>/", views.PodcastSearch.as_view(), name="podcast-search-view")
]
