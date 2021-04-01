from rest_framework.serializers import Serializer, FileField
from .models import File


class FileSerializer(Serializer):
    file_upload = FileField()

    class Meta:
        fields = ['file']
