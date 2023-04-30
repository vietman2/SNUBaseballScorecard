from django.http import HttpResponse, JsonResponse

from tournament.models import Tournament
from .models import Group

# Create your views here.
    
def groups_by_tournament(request, tournament):
    if request.method == 'GET':
        t = Tournament.objects.get_by_name(tournament)
        groups = Group.objects.filter(tournament=t).values()
        group_list = [g for g in groups]
        return JsonResponse(group_list, safe=False)