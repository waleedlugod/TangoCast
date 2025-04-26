from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views


router = DefaultRouter()
# TODO: only use the route below
router.register(r"", views.PodcastViewSet, basename="podcast")
router.register(r"creators", views.CreatorPodcastViewSet, basename="creator")

urlpatterns = [
    # BUG: this overwrote the other veiwset so the only permission is GET
    # path("", views.PodcastSearch.as_view(), name="podcast-search-view"),
    # path("<uuid:id>/", views.GetPodcast.as_view(), name="get_podcast"),
    path("", include(router.urls)),
]
