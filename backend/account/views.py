from django.shortcuts import render
from django.contrib import messages
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer

from .forms import CustomUserCreationForm

def register(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False
            user.save()

            messages.success(request, "회원가입이 완료되었습니다. 관리자의 승인을 기다려주세요.")
        else:
            if form.errors:
                for field in form:
                    for error in field.errors:
                        messages.error(request, error)
    else:
        form = CustomUserCreationForm()
    return render(request, "register.html", {"form": form})
class LoginView(TokenObtainPairView):
    pass
