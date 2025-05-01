from rest_framework import status, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.authentication import SessionAuthentication

from .models import UserModel, CreatorModel, ListenerModel
from podcast_search.models import Podcast
from podcast_search.serializers import PodcastSerializer

from podcast_share.models import SharedPodcast

from .serializers import UserSerializer, CreatorSerializer, ListenerSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_serializer = UserSerializer(data=request.data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                user_serializer.data,
                status=status.HTTP_201_CREATED,
            )
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, permission_classes=[IsAuthenticated])
    def get_me(self, request):
        user_serializer = UserSerializer(request.user)
        if request.user.role == "listenerUser":
            listener = ListenerModel.objects.get(listener_id=request.user)
            listener_serializer = ListenerSerializer(listener)
            return Response(
                {"user": user_serializer.data, "listener": listener_serializer.data}
            )
        elif request.user.role == "creatorUser":
            creator = CreatorModel.objects.get(creator_id=request.user)
            creator_serializer = CreatorSerializer(creator)
            return Response(
                {"user": user_serializer.data, "creator": creator_serializer.data}
            )


class CreatorViewSet(viewsets.ModelViewSet):
    queryset = CreatorModel.objects.all()
    serializer_class = CreatorSerializer
    authentication_classes = [JWTAuthentication, SessionAuthentication]

    @action(detail=False, permission_classes=[IsAuthenticated])
    def get_followers(self, request):
        followers = ListenerModel.objects.filter(follows__creator_id=request.user)
        serializer = ListenerSerializer(followers, many=True)
        return Response(serializer.data)


class ListenerViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    queryset = ListenerModel.objects.all()
    serializer_class = ListenerSerializer

    @action(detail=False, permission_classes=[IsAuthenticated])
    def get_followed_podcasts(self, request):
        listener = ListenerModel.objects.get(listener_id=request.user)
        podcasts = Podcast.objects.filter(
            creator__in=listener.follows.all()
        ).select_related("creator")
        serializer = PodcastSerializer(podcasts, many=True)
        return Response(serializer.data)

    @action(detail=False, permission_classes=[IsAuthenticated])
    def get_followed_shares(self, request):
        followed = ListenerModel.objects.get(listener_id=request.user).follows.all()
        followed_users = UserModel.objects.filter(id__in=followed)
        shared_podcasts_of_followed = SharedPodcast.objects.filter(
            shared_by__in=followed_users
        ).values_list("podcast", flat=True)
        podcasts = Podcast.objects.filter(id__in=shared_podcasts_of_followed)
        serializer = PodcastSerializer(podcasts, many=True)
        return Response(serializer.data)
