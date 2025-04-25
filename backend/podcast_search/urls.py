from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
router.register(r"", views.PodcastViewSet, basename="podcast")
router.register(r"creators", views.CreatorPodcastViewSet, basename="creator")

urlpatterns = [
    path("", views.PodcastSearch.as_view(), name="podcast-search-view"),
    path("<uuid:id>/", views.GetPodcast.as_view(), name="get_podcast"),
    path("podcasts/", include(router.urls)),
]
