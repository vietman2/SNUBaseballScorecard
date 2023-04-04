from django.http import HttpResponse, JsonResponse

from .models import Tournament

# Create your views here.

def list(request):
    if request.method == 'GET':
        tournaments_list = [tournament for tournament in Tournament.objects.all().values()]
        return JsonResponse(tournaments_list, safe=False)