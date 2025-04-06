from django.urls import path
from .views import GetPodcast

urlpatterns = [
    path('<uuid:id>/', GetPodcast.as_view(), name='get_shared_podcast'),
]
