from rest_framework import serializers
from .models import Post, Reply


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'


class PostLenSerilizer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id']


class ReplySerializer(serializers.ModelSerializer):

    class Meta :
        model = Reply
        fields = '__all__'