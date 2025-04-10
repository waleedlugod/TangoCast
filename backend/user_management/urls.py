from django.urls import path
from user_management import views
from .views import RegisterView, LogoutView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="user-register"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("creator/<int:pk>/", views.creator_detail),
    path("creators/", views.creator_list),
    path("users/", views.user_list),
]
app_name = "user_management"
