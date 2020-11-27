from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer, NotebookSerializer, NoteSerializer

from django.contrib.auth.hashers import make_password

from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from .models import Notebook, Note


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):

    if request.method == "POST":
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(password=make_password(request.data["password"]))
            user_id = User.objects.get(username=request.data["username"]).pk
            token = Token.objects.get(user_id=user_id)
            data = {"token": token.key}
            data.update(serializer.data)
            return Response(data, status=status.HTTP_201_CREATED)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_notebooks(request):
    if Notebook.objects.filter(user=request.user).exists():
        notebook_list = Notebook.objects.filter(user=request.user)
        list_of_names = []
        for notebook in notebook_list:
            list_of_names.append([notebook.name, notebook.slug])
        return Response(data={"success": list_of_names}, status=status.HTTP_200_OK)
    else:
        return Response(data={"error": "Empty"})


@api_view(["POST"])
def create_notebook(request):
    if request.method == "POST":
        data = {
            "name": request.data["name"],
            "user": request.user.pk
        }
        serializer = NotebookSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_200_OK)

        else:
            return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
def delete_notebook(request, slug):
    if request.method == "DELETE":
        if Notebook.objects.filter(slug=slug).exists():
            notebook = Notebook.objects.filter(slug=slug).first()
            if notebook.slug == slug and notebook.name == request.data["name"] and notebook.user_id == request.user.id:
                notebook.delete()
                return Response(data={"success": "Notebook successfully removed"}, status=status.HTTP_200_OK)
        else:
            return Response(data={"error": "Notebook does not exist"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
def rename_notebook(request, slug):
    if request.method == "PATCH" and Notebook.objects.filter(slug=slug).exists() is True:
        notebook = Notebook.objects.get(slug=slug)

        if notebook.user_id == request.user.pk:
            notebook.name = request.data["name"]
            notebook.save()
            return Response(data={"success": "Notebook renamed"}, status=status.HTTP_200_OK)

        else:
            return Response(data={"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        return Response(data={"error": "Notebook does not exist"})


@api_view(["GET"])  # Todo: test this endpoint
def get_notes(request, notebook_slug):
    if Notebook.objects.filter(slug=notebook_slug).exists():  # checks if the notebook exists
        notebook = Notebook.objects.get(slug=notebook_slug)
        if notebook.user_id == request.user.pk:
            notes = Note.objects.filter(notebook_id=notebook.pk)
            list_of_names = []

            for note in notes:
                list_of_names.append([note.name, note.slug])

            return Response(data={"success": list_of_names}, status=status.HTTP_200_OK)

        else:
            return Response(data={"error": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    else:
        return Response(data={"error": "Notebook does not exist"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def get_note_content(request, note_slug):
    if Note.objects.filter(slug=note_slug).exists():
        note = Note.objects.get(slug=note_slug)
        notebook_id = note.notebook_id
        if Notebook.objects.get(id=notebook_id).user_id == request.user.pk: # checks that the owner of the notebook is the same account making the request

            return Response({"success": note.content})

        else:
            return Response({"error": "Unauthorized"})

    else:
        return Response({"error": "Note does not exist"})


@api_view(["POST"])
def create_note(request, notebook_slug):
    if request.method == "POST" and Notebook.objects.filter(slug=notebook_slug).exists():
        notebook = Notebook.objects.get(slug=notebook_slug)
        if notebook.user_id == request.user.pk:
            # checks that the owner of the notebook being modified matches token cookie
            data = {"notebook": notebook.pk}
            # matches note with notebook with the notebook's slug
            data.update(request.data)
            serializer = NoteSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(data=serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response(data={"error": "Unauthorized"})

    else:
        return Response(data={"error": "Notebook does not exist"})


@api_view(["PATCH"])
def update_note(request, notebook_slug, note_slug):
    if Notebook.objects.filter(slug=notebook_slug).exists():
        if Notebook.objects.get(slug=notebook_slug).user_id == request.user.pk:
            note = Note.objects.get(slug=note_slug)
            note.content = request.data["content"]
            note.notebook = Notebook.objects.get(slug=notebook_slug)
            note.save()
            return Response(data={"success": "Note updated"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Notebook does not exist"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PATCH"])
def rename_note(request, note_slug):
    if Note.objects.filter(slug=note_slug).exists():
        note = Note.objects.get(slug=note_slug)
        note.name = request.data["name"]
        note.save()
        return Response(data={"success": "Note renamed"}, status=status.HTTP_200_OK)

    else:
        return Response(data={"error": "Note does not exist"})


@api_view(["DELETE"])
def delete_note(request, note_slug):
    if Note.objects.filter(slug=note_slug).exists():
        note = Note.objects.get(slug=note_slug)
        if Notebook.objects.get(id=note.notebook_id).user_id == request.user.pk:
            note.delete()
            return Response(data={"success": "Note deleted"})
    else:
        return Response(data={"error": "Note does not exist"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def does_note_exist(request, note_slug):
    if Note.objects.filter(slug=note_slug).exists():
        return Response(data={"success": "Note exists"}, status=status.HTTP_200_OK)
    else:
        return Response(data={"error": "Note does not exist"}, status=status.HTTP_200_OK)
