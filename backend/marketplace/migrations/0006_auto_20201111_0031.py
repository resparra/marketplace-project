# Generated by Django 3.1.3 on 2020-11-11 04:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0005_provider_approved'),
    ]

    operations = [
        migrations.AlterField(
            model_name='provider',
            name='approved',
            field=models.BooleanField(default=False),
        ),
    ]
