from django.urls import path

from . import views

urlpatterns = [
    path("<str:title>/", views.SongSearch.as_view(), name="song-search-view")
]
