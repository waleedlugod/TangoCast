from django.urls import path

from . import views

urlpatterns = [path("", views.SongGet.as_view(), name="song-get-view")]
