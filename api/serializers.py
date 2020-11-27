from rest_framework.serializers import ModelSerializer, CharField, EmailField, RelatedField
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import Notebook, Note


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    username = CharField(max_length=20, min_length=4, validators=[UniqueValidator(
        queryset=User.objects.all(),
        message="Username is taken")],
                         required=True)

    email = EmailField(max_length=150, validators=[UniqueValidator(
        queryset=User.objects.all(),
        message="Email address is already in use")],
        required=True)

    password = CharField(max_length=150, required=True)


class NotebookSerializer(ModelSerializer):
    class Meta:
        model = Notebook
        fields = ["name", "user"]


class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ["name", "content", "notebook", "slug"]


