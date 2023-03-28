from django.contrib import admin
from .models import Bill,BillItem
# Register your models here.
class BillAdmin(admin.ModelAdmin):
    list_display = ['bill_id','bill_number','mobile','bill_date','counter','cashier','amount','payment_mode']
class BillItemsAdmin(admin.ModelAdmin):
    list_display = ['id', 'bill_number','item_name' ,'price','quantity' ,'amount' ]


admin.site.register(Bill,BillAdmin)
admin.site.register(BillItem,BillItemsAdmin)
