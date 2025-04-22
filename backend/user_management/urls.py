from django.urls import path, include
from user_management import views
from .views import (
    RegisterView,
    LogoutView,
    UserViewSet,
    CreatorViewSet,
    ListenerViewSet,
)
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


router = DefaultRouter()
router.register(r"users", UserViewSet, basename="user")
router.register(r"creators", CreatorViewSet, basename="creator")
router.register(r"listeners", ListenerViewSet, basename="listeners")

urlpatterns = [
    path("register/", RegisterView.as_view(), name="user-register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("", include(router.urls)),
]
app_name = "user_management"
