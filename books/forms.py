from books.models import Book
from django.contrib.auth.models import User
from django import forms

class BookForm(forms.ModelForm):
    class Meta:
        model=Book 
        exclude=('total_votes', 'total_users', 'already_voted')
