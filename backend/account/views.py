import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.contrib.auth import get_user_model
from random import randint
from .sms import send_verification_code

User = get_user_model()

@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    data = json.loads(request.body)
    email = data.get('email')
    user_type = data.get('user_type')
    phone_number = data.get('phone_number')
    password = data.get('password')

    if not all([email, user_type, phone_number, password]):
        return JsonResponse({'error': 'Please fill all fields'}, status=400)
    
    user = User.objects.create_user(email=email, user_type=user_type, phone_number=phone_number, password=password)
    verification_code = str(randint(100000, 999999))
    request.session['verification_code'] = verification_code
    send_verification_code(phone_number, verification_code)
    return JsonResponse({'success': 'User created successfully'}, status=201)

@csrf_exempt
@require_http_methods(["POST"])
def verify_phone(request):
    data = json.loads(request.body)
    entered_code = data.get('code')

    if entered_code == request.session.get('verification_code'):
        email = request.session.get('email')
        user = User.objects.get(email=email)
        user.is_phone_verified = True
        user.save()
        del request.session['verification_code']
        del request.session['email']
        return JsonResponse({'success': 'Phone number verified successfully'}, status=200)
    else:
        return JsonResponse({'error': 'Invalid verification code'}, status=400)