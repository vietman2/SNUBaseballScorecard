from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import UserSerializer

@APIView(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

@APIView(['PUT'])
def confirm_referee(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)