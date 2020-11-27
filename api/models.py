from django.db import models
from django.contrib.auth.models import User

# Create your models here.
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

from randomslugfield import RandomSlugField


class Users(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=20)

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)


class Notebook(models.Model):
    name = models.CharField(max_length=50, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    slug = RandomSlugField(length=10, null=False)


class Note(models.Model):
    name = models.CharField(max_length=30)
    content = models.TextField()
    last_updated = models.DateTimeField(auto_now=True)
    notebook = models.ForeignKey(Notebook, on_delete=models.CASCADE)
    slug = RandomSlugField(length=15, null=False)
