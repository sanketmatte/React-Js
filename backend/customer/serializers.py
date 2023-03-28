# from django.contrib.auth.models import User
from rest_framework import serializers
# from django.contrib.auth import authenticate
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


