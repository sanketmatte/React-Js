from django.contrib import admin
from .models import Customer
# Register your models here.
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['customer_id','name','email','mobile','dob','doj','is_active']

admin.site.register(Customer,CustomerAdmin)
