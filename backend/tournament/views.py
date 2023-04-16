from django.http import JsonResponse

from .models import Tournament

# Create your views here.

def list(request):
    if request.method == 'GET':
        tournaments = Tournament.objects.all().values()
        tournament_list = [t for t in tournaments]
        return JsonResponse(tournament_list, safe=False)

def names(request):
    if request.method == 'GET':
        tournaments = Tournament.objects.all().order_by('-id')
        names = [t.name for t in tournaments]
        return JsonResponse({"names": names}) 
