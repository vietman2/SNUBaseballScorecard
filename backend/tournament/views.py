from django.http import JsonResponse

from .models import Tournament

# Create your views here.

def names(request):
    if request.method == 'GET':
        tournaments = Tournament.objects.get_names()
        return JsonResponse({"names": tournaments}) 
