from django.urls import path

from . import views

urlpatterns = [path("", views.PodcastSearch.as_view(), name="podcast-search-view")]
