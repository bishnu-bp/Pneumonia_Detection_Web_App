from django.urls import path
from .views import predict_image
from django.urls import path
from .views import RegisterView, UserView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenObtainPairView,
)

urlpatterns = [
    path("predict/", predict_image),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("user/", UserView.as_view(), name="user"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),

]

