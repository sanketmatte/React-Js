from django.db import models
from django.core.validators import RegexValidator

# Create your models here.





class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    email = models.EmailField()
    phone_regex = RegexValidator(regex=r'^\d{10}', message="Please enter a valid 10-digit mobile number")
    mobile = models.CharField(validators=[phone_regex],unique=True, max_length=10, blank=True)
    dob = models.DateField(null=True)
    doj = models.DateField(auto_now=True)
    is_active = models.BooleanField(default=True)



    def __str__(self):
        return str(self.mobile)

     