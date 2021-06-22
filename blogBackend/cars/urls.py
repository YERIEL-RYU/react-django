# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'car'

car_router = DefaultRouter()
car_router.register(r'', views.CarViewSet)

urlpatterns = [
    path('', include(car_router.urls))
]
