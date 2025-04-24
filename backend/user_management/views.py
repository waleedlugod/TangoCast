from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from .models import UserModel, CreatorModel, ListenerModel
from podcast_search.models import Podcast
from podcast_search.serializers import PodcastSerializer

from podcast_share.models import SharedPodcast
from podcast_share.serializers import SharedPodcastSerializer

from .serializers import UserSerializer, CreatorSerializer, ListenerSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "Logged out successfully"}, status=200)
        except Exception as e:
            return Response({"error": str(e)}, status=400)


class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    @action(detail=False)
    def get_me(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def get_permissions(self):
        if self.action == "get_me":
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]


class CreatorViewSet(viewsets.ModelViewSet):
    queryset = CreatorModel.objects.all()
    serializer_class = CreatorSerializer


class ListenerViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    queryset = ListenerModel.objects.all()
    serializer_class = ListenerSerializer

    def get_permissions(self):
        if (
            self.action == "get_followed_podcasts"
            or self.action == "get_followed_shares"
        ):
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = []
        return [permission() for permission in permission_classes]

    @action(detail=False)
    def get_followed_podcasts(self, request):
        listener = ListenerModel.objects.get(listener_id=request.user)
        podcasts = Podcast.objects.filter(creator__in=listener.follows.all())
        serializer = PodcastSerializer(podcasts, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def get_followed_shares(self, request):
        followed = ListenerModel.objects.get(listener_id=request.user).follows.all()
        followed_users = UserModel.objects.filter(id__in=followed)
        shared_podcasts_of_followed = SharedPodcast.objects.filter(
            shared_by__in=followed_users
        ).values_list("podcast", flat=True)
        podcasts = Podcast.objects.filter(id__in=shared_podcasts_of_followed)
        serializer = PodcastSerializer(podcasts, many=True)
        return Response(serializer.data)
