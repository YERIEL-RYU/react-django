from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from rest_framework.response import Response
from rest_framework import filters
from .models import Post
from .serializers import PostSerializer
# Create your views here.


class PostViewSet(mixins.UpdateModelMixin,
                  mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  viewsets.GenericViewSet):
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated_at']
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = None
