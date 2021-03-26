from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from rest_framework.response import Response
from rest_framework import filters
from .models import Post
from .serializers import PostSerializer, PostLenSerilizer
# Create your views here.


class PostViewSet(mixins.UpdateModelMixin,
                  #   mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['updated_at']
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = None

    def list(self, request):
        query = Post.objects.last()
        postLen = PostLenSerilizer(query)
        print(postLen.data)

        queryset = self.get_queryset()
        serializer = PostSerializer(queryset, many=True)

        content = {
            "postLen": postLen.data,
            "data": serializer.data
        }

        return Response(content, status=200)
