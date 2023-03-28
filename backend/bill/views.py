# from django.http import Http404
# from django.shortcuts import render

# Create your views here.

from rest_framework import viewsets
from .models import Bill, BillItem
from .serializers import BillSerializer, BillItemSerializer
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404
# from rest_framework import status
# from customer.models import Customer

# class BillViewSet(viewsets.ModelViewSet):
#     queryset = Bill.objects.all()
#     serializer_class = BillSerializer
#     def get_queryset(self):
#         queryset = super().get_queryset()
#         filters = {}
#         for key, value in self.request.query_params.items():
#             filters[key] = value
#         if filters:
#             queryset = queryset.filter(**filters)
#         return queryset
    
#     def perform_create(self, serializer):
#         mobile = self.request.data.get('mobile')
#         try:
#             customer = Customer.objects.get_by_mobile(mobile=mobile)


#         except Customer.DoesNotExist:
#             return Response({'mobile': 'Customer with this mobile number does not exist.'}, 
#                             status=status.HTTP_400_BAD_REQUEST)
#         serializer.save(mobile=customer)


# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from django.shortcuts import get_object_or_404

class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all().order_by('-bill_date')
    serializer_class = BillSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        filters = {}
        for key, value in self.request.query_params.items():
            filters[key] = value
        if filters:
            queryset = queryset.filter(**filters)
        return queryset

class BillItemViewSet(viewsets.ModelViewSet):
    queryset = BillItem.objects.all()
    serializer_class = BillItemSerializer
    def get_queryset(self):
        queryset = super().get_queryset()
        filters = {}
        for key, value in self.request.query_params.items():
            filters[key] = value
        if filters:
            queryset = queryset.filter(**filters)
        return queryset

