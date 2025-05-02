from rest_framework import filters, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import SessionAuthentication
from django_filters.rest_framework import DjangoFilterBackend
from .models import Podcast
from .serializers import PodcastSerializer


class PodcastViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permision_classes = [IsAuthenticatedOrReadOnly]
    queryset = Podcast.objects.all()
    serializer_class = PodcastSerializer

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    search_fields = ["title"]
    filterset_fields = ["category", "creator"]
    ordering_fields = ["views"]

    @action(detail=False)
    def get_categories(self, request):
        return Response(
            Podcast.objects.all().values_list("category", flat=True).distinct()
        )
