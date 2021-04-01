from django.shortcuts import render
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from .serializers import FileSerializer
from .models import File

# Create your views here.


class FileViewSet(ViewSet):
    serializer_class = FileSerializer

    def list(self, request):
        queryset = File.objects.all()
        serializer = FileSerializer(queryset, many=True)

        return Response(serializer.data)

    def create(self, request):
        file_upload =
