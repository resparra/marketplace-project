# Generated by Django 3.1.3 on 2020-11-11 00:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('marketplace', '0003_auto_20201108_2343'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='provider',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='provider',
            name='longitude',
        ),
    ]