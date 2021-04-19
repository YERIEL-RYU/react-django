from rest_framework.serializers import Serializer, FileField
from .models import File


class FileSerializer(Serializer):
    file_upload=FileField()

    class Meta:
        Model = File
        fields = '__all__'

    def create(self, validated_data):
        images_data = self.context['request'].FILES
        for image_data in images_data.getlist('image'):
            File.objects.create(image=image_data)
        return File

