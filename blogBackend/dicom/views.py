from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import DicomSerializer
from django.shortcuts import get_object_or_404
from .models import Dicom
import os
from os import path as change_extension, stat, error, makedirs, remove
from django.conf import settings
import mritopng
class DicomViewSet(APIView):
    def post(self, request) :
        serializer = DicomSerializer(data=request.data)
        filename = str(request.data['dicom'])
        folder_path = os.path.join(settings.BASE_DIR, 'static_files')
        dicom_path = folder_path+ '/dicom/'+filename
        if '.dcm' in filename:
            filename = change_extension.splitext(filename)[0]
        png_path = folder_path+ '/dicom/png/'+filename+'.png'
        # print(png_path)

        if serializer.is_valid():
            serializer.save()
            # dicom_path = folder_path+str(serializer.data['dicom'])
            makedirs(folder_path + '/dicom/png/', exist_ok=True)
            mritopng.convert_file(dicom_path, png_path)
            png_path = '/media/dicom/png/'+filename+'.png'

            return Response({"path":png_path}, status=201)
        return Response(serializer.errors, status=400)

class DicomDeleteViewSet(APIView):
    def delete(self, request, pk):
        dicom = get_object_or_404(Dicom, pk=pk)
        os.remove(dicom.dicom.path)
        dicom.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)