from django.urls import path
from .views import share_podcast, get_shared_podcast

urlpatterns = [
    path('<int:podcast_id>/share/', share_podcast, name='share_podcast'),
    path('<int:podcast_id>/share/<uuid:share_uuid>/', get_shared_podcast, name='get_shared_podcast'),
]
