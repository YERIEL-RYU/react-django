from django.db import models

# Create your models here.


class File(models.Model):
    file_upload = models.FileField(upload_to="File/image", blank=False, null=False)

    def __str__(self):
        return self.file_upload.name
