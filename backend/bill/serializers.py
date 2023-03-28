# from django.contrib.auth.models import User
from rest_framework import serializers
# from django.contrib.auth import authenticate
from .models import Bill,BillItem

class BillSerializer(serializers.ModelSerializer):
    # payment_mode = serializers.ChoiceField(choices=Bill.PAYMENT_CHOICES)
    payment_mode = dict(Bill.PAYMENT_CHOICES)
    # print(serializers.ChoiceField(choices=Bill.PAYMENT_CHOICES))
    class Meta:
        model = Bill
        fields = '__all__'
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['payment_mode'] = dict(Bill.PAYMENT_CHOICES)[ret['payment_mode']]
        return ret

class BillItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillItem
        fields = '__all__'

# class BillSerializer(serializers.ModelSerializer):
#     mobile = serializers.CharField()

#     class Meta:
#         model = Bill
#         fields = ['mobile', 'counter', 'cashier', 'amount', 'payment_mode']

#     def create(self, validated_data):
#         mobile = validated_data.pop('mobile')
#         customer = get_object_or_404(Customer, mobile=mobile)
#         bill = Bill.objects.create(mobile=customer, **validated_data)
#         return bill

