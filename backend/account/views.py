# views.py
from django.shortcuts import render
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views import View
from django.contrib import messages

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

class LoginView(View):
    def post(self, request):
        phonenumber = request.POST.get('phonenumber')
        password = request.POST.get('password')
        user = authenticate(request, phonenumber=phonenumber, password=password)

        if user is not None:
            login(request, user)
            data = {
                'id': user.id,
                'name': user.name,
                'phonenumber': user.phonenumber,
                'email': user.email,
                'user_type': user.user_type,
            }
            return JsonResponse(data, status=200)
        return JsonResponse({'detail': 'Invalid credentials'}, status=401)