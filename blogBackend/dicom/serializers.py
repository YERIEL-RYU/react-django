from rest_framework.serializers import ModelSerializer
from .models import Dicom, DicomPng


class  DicomSerializer(ModelSerializer) :
    class Meta:
        model = Dicom
        fields = '__all__'


class DicomPngSerializer(ModelSerializer):

    class Meta :
        model = DicomPng
        field = '__all__'