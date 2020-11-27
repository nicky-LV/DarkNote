from django.urls import path
from .views import register, create_notebook, delete_notebook, rename_notebook, create_note, update_note, get_notes, \
    get_note_content, get_notebooks, rename_note, delete_note, does_note_exist
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('register/', register, name='register'),
    path('login/', obtain_auth_token, name='login'),
    # Login (if valid) returns the auth token which should then be saved as a cookie.

    path('notebook/get/', get_notebooks, name='get-notebooks'),
    path('notebook/new/', create_notebook, name='create-notebook'),
    path('notebook/delete/<slug>/', delete_notebook, name='delete-notebook'),
    path('notebook/rename/<slug>/', rename_notebook, name='update-notebook'),

    path('note/get/<notebook_slug>/', get_notes, name='get-notes'),
    path('note/get/content/<note_slug>/', get_note_content, name='get-note-content'),
    path('note/new/<notebook_slug>/', create_note, name='create-note'),
    path('note/update/<notebook_slug>/<note_slug>/', update_note, name='update-note-content'),
    path('note/rename/<note_slug>/', rename_note, name='rename-note'),
    path('note/delete/<note_slug>/', delete_note, name='delete-note'),
    path('note/exists/<note_slug>/', does_note_exist, name='does-note-exist')
]