from django.http import HttpResponse, JsonResponse

from .models import Group

# Create your views here.

def list(request):
    if request.method == 'GET':
        groups_list = [group for group in Group.objects.all().values()]
        return JsonResponse(groups_list, safe=False)