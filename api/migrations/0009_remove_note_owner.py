# Generated by Django 3.1.2 on 2020-10-31 15:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20201031_1453'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='note',
            name='owner',
        ),
    ]
