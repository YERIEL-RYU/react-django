from django.db import models

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    body = models.TextField()
    important = models.BooleanField()
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    writer = models.CharField(max_length=100, null=False, blank=False)

    def __str__(self):
        return self.title
