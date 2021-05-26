from rest_framework.serializers import ModelSerializer
from .models import Dicom


class  DicomSerializer(ModelSerializer) :
    class Meta:
        model = Dicom
        fields = '__all__'