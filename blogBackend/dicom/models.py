from django.db import models


class Dicom(models.Model):
    dicom = models.FileField(upload_to='dicom/')