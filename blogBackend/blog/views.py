from django.shortcuts import render
from rest_framework import viewsets, mixins, generics
from rest_framework.response import Response
from rest_framework import filters
from .models import Post
from .serializers import PostSerializer, PostLenSerilizer
from django.core.files.base import ContentFile
import base64, secrets
import shutil
import os
from backend.settings import BASE_DIR

from image.models import Image

# Create your views here.


class PostViewSet(mixins.UpdateModelMixin,
                  #   mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                #   mixins.CreateModelMixin,
                #   mixins.DestroyModelMixin,
                  viewsets.GenericViewSet):
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    ordering_fields = ['updated_at']
    search_fields = ['title','body']
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    pagination_class = None

    def list(self, request):
        print(request)
        query = Post.objects.last()
        postLen = PostLenSerilizer(query)

        queryset = Post.objects.all().order_by('-updated_at')
        serializer = PostSerializer(queryset, many=True)

        content = {
            "postLen": postLen.data,
            "data": serializer.data
        }

        return Response(content, status=200)


    def create(self, request, *args):
        title = self.get_serializer(data=request.data).initial_data['title']
        body = self.get_serializer(data=request.data).initial_data['body']
        writer = self.get_serializer(data=request.data).initial_data['writer']
        important = self.get_serializer(data=request.data).initial_data['important']

        # print(self.get_serializer(data=request.data))

        body_list = body.split('"')
        img = [image for image in body_list if 'data:' in image]
        num = [ind for ind, val in enumerate(body_list) if 'data:' in val]

        file_names = []
        title_num = 1
        for data in img:
            format, imgstr = data.split(';base64')
            name, extension   = secrets.token_hex(20), format.split('/')[-1]
            data = ContentFile(base64.b64decode(imgstr), name=f"{title}_{title_num}.{extension}")
            image = Image.objects.create(image=data)
            image = 'http://localhost:8000/media/'+image.__str__()
            file_names.append(image)
            title_num +=1
            print(title_num)
        print(file_names)


        t = 0
        for n in num :
            body_list[n] = file_names[t]
            t += 1
        
        body = ('"').join(body_list)
        print(body)
        Post.objects.create(title=title, body=body, important=important, writer=writer)
        
        return Response({"create":'good'}, status=201)

    def destroy (request, *args, **kwargs) :
        id= kwargs['pk']
        post = Post.objects.get(pk=id)
        print(post)
        print(BASE_DIR)
        delete_path = os.path.join(BASE_DIR, 'static_files/post/'+str(post))
        post.delete()
        shutil.rmtree(delete_path)

        return Response({"delete":'good'}, status=204)