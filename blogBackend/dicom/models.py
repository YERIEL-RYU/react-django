from django.db import models


class Dicom(models.Model):
    dicom = models.FileField(upload_to='dicom/')

class DicomPng (models.Model):
    dicom_png = models.ImageField(upload_to='dicom/png')