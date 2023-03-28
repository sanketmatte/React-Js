import uuid
from django.db import models
from customer.models import Customer
from django.core.validators import MinValueValidator
# Create your models here.

class Bill(models.Model):
    bill_id = models.AutoField(primary_key=True)
    bill_number = models.IntegerField( default=1000,unique=True)
    # bill_number = models.CharField(max_length=7, unique=True, default='BN00001')
    mobile = models.ForeignKey(Customer,to_field='mobile', on_delete=models.DO_NOTHING, related_name='bills')
    bill_date = models.DateField( auto_now_add=True)
    counter  = models.IntegerField()
    cashier = models.CharField(max_length=25)
    amount = models.FloatField()
    gst = models.FloatField()
    grand_total = models.FloatField()
    
    PAYMENT_CHOICES = [
        (1,'CASH]'),
        (2,'CARD'),
        (3,'UPI')
    ]
    payment_mode =models.IntegerField(choices=PAYMENT_CHOICES)

    def save(self, *args, **kwrgs):
        if not self.bill_id:
            last = Bill.objects.order_by('-bill_number').first()
            if last:
                self.bill_number = last.bill_number+1
        super(Bill, self).save( *args, **kwrgs)


    def __str__(self):
        return str(self.bill_number)
    
class BillItem(models.Model):
    id = models.AutoField(primary_key=True)
    bill_number = models.ForeignKey(Bill, to_field='bill_number', on_delete=models.DO_NOTHING)
    item_name = models.CharField( max_length=50)
    price = models.DecimalField(max_digits=20, decimal_places=2, validators=[MinValueValidator(0)])
    quantity = models.IntegerField()
    amount = models.DecimalField(max_digits=20, decimal_places=2, validators=[MinValueValidator(0)])

    

