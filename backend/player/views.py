import pandas as pd
from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser

from .models import Player, Player_Tournament

# Create your views here.

@api_view(['POST'])
@parser_classes([MultiPartParser])
def excel_file(request):
    excel_file = request.FILES.get('file')

    if excel_file is None:
        return JsonResponse({
            'error': 'No excel file is attached'
        }, status=400)

    df = pd.read_excel(excel_file, engine='openpyxl')

    summary = {
        'new_players': 0,
        'updated_players': 0,
        'errors': [],
    }

    for i in range(0, df.shape[0]):
        row = df.iloc[i]
        idx = df.index[i]

        college = row['대 학']
        department = row['학 과']
        student_id = row['학 번']
        name = row['성 명']
        status = row['재적현황']

        print("대학: " + college + ", 학과: " + department + ", 학번: " + str(student_id) + ", 이름: " + name + ", 재적현황: " + status)



    # Return the summary as a JSON response
    return JsonResponse(summary)