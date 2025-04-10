from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

from .models import UserModel, CreatorModel

from .serializers import UserSerializer, CreatorSerializer


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


@csrf_exempt
def user_list(request):
    if request.method == "GET":
        users = UserModel.objects.all()
        serializer = UserSerializer(users, many=True)
        return JsonResponse(serializer.data, safe=False)

    if request.method == "DELETE":
        users = UserModel.objects.all()
        for user in users:
            user.delete()
        return HttpResponse(status=204)


@csrf_exempt
def creator_list(request):
    if request.method == "GET":
        creators = CreatorModel.objects.all()
        serializer = CreatorSerializer(creators, many=True)
        return JsonResponse(serializer.data, safe=False)


@csrf_exempt
def creator_detail(request, pk):
    try:
        creator = CreatorModel.objects.get(pk=pk)
    except CreatorModel.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == "GET":
        serializer = CreatorSerializer(creator)
        return JsonResponse(serializer.data)

    if request.method == "PUT":
        data = JSONParser().parse(request)
        serializer = CreatorSerializer(creator, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)
