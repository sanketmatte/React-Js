from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

from rest_framework import viewsets
from .models import Customer
from .serializers import CustomerSerializer

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.filter(is_active=True).order_by('-doj')
    serializer_class = CustomerSerializer
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    def get_queryset(self):
        queryset = super().get_queryset()
        filters = {}
        for key, value in self.request.query_params.items():
            filters[key] = value
        if filters:
            queryset = queryset.filter(**filters)
        return queryset