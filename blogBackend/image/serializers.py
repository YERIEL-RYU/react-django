from rest_framework.serializers import Serializer, ImageField
from .models import Image


class ImageSerializer(Serializer):
    image=ImageField()

    class Meta:
        Model = Image
        fields = '__all__'

    def create(self, validated_data):
        images_data = self.context['request'].FILES
        # print(images_data)
        test=Image.objects.create(image=images_data['image'])
        print('test : ',test)
        return test

