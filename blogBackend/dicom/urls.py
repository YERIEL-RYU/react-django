from django.urls import path
from . import views

app_name='dicom'

urlpatterns=[
    path('', views.DicomViewSet.as_view()),
    path('<int:pk>/',views.DicomDeleteViewSet.as_view())
]