from django.db import models

# Create your models here.


class Post(models.Model):
    title = models.CharField(max_length=100, null=False, blank=False)
    body = models.TextField()
    important = models.BooleanField()
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now=True)
    writer = models.CharField(max_length=100, null=False, blank=False)
    reply_check = models.BooleanField(default=False)

    def __str__(self):
        return self.title


class Reply(models.Model) :
    post = models.OneToOneField(Post, on_delete=models.CASCADE, related_name='post')
    answer_content = models.TextField()
    writer = models.CharField(max_length=100, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)