from django.shortcuts import render
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserSerializer
from .models import User


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom token serializer that includes user data in response.
    """
    
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user'] = UserSerializer(self.user).data
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom token view that uses the custom serializer.
    """
    serializer_class = CustomTokenObtainPairSerializer


class UserRegistrationView(generics.CreateAPIView):
    """
    View for user registration.
    
    Creates a new user account with validated data.
    """
    
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = UserRegistrationSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        return Response({
            'message': 'User registered successfully.',
            'user': UserSerializer(user).data
        }, status=status.HTTP_201_CREATED)


class UserProfileView(generics.RetrieveUpdateAPIView):
    """
    View for user profile management.
    
    Allows authenticated users to view and update their profile.
    """
    
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
