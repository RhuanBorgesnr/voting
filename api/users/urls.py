from django.urls import path
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
)
from .views import (
    CustomTokenObtainPairView,
    UserRegistrationView,
    UserProfileView,
)

app_name = 'users'

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
] 