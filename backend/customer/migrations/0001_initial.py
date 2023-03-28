# Generated by Django 3.2.18 on 2023-03-22 10:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('customer_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('email', models.EmailField(max_length=254)),
                ('mobile', models.IntegerField()),
                ('dob', models.DateField(null=True)),
                ('doj', models.DateField(auto_now=True)),
                ('is_active', models.BooleanField(default=True)),
            ],
        ),
    ]
