from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import UserSerializer, UserLoginSerializer


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        data = {
            'email' :request.data.get('email'),
            'password' : request.data.get('password')
        }
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            userdetails = {
                'username': request.user.username, 
                'email': request.user.email, 
                'first_name': request.user.first_name, 
                'last_name': request.user.last_name
            }
            return Response(userdetails, status=status.HTTP_200_OK)

class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logged out successfully'})
    
# class UserDetailsView(APIView):
#     def get(self, request):
#         return Response({'user': request.user.username, 'email': request.user.email, 'first_name': request.user.first_name, 'last_name': request.user.first_name}, status=status.HTTP_200_OK)
