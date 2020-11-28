# Generated by Django 3.1.2 on 2020-10-31 00:05

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0006_auto_20201030_2350'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='user',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]