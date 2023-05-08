from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    name = forms.CharField(label="이름")
    phonenumber = forms.CharField(label="전화번호")
    email = forms.EmailField(label="이메일")
    
    class Meta:
        model = CustomUser
        fields = ('name', 'phonenumber', 'email')