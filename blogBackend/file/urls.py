from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'file'

post_router = DefaultRouter()
post_router.register(r'', views.FileViewSet)

urlpatterns = [
    path('', include(post_router.urls))
]
