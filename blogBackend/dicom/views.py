from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import DicomSerializer
from django.shortcuts import get_object_or_404
from .models import Dicom
import os

class DicomViewSet(APIView):
    def post(self, request) :
        print(request.data)
        serializer = DicomSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class DicomDeleteViewSet(APIView):
    def delete(self, request, pk):
        dicom = get_object_or_404(Dicom, pk=pk)
        os.remove(dicom.dicom.path)
        dicom.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)