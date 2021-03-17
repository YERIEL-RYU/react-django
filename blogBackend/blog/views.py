from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from rest_framework.response import Response
from .models import Post

# Create your views here.


class PostViewSet(mixins.UpdateModelMixin, mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin):
    queryset = Post.objects.all()
