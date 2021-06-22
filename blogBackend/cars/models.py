from django.db import models

class Car (models.Model):
    CONTENT_TYPE_CHOICE = (
        ('goods','goods'),
        ('delivery','delivery'),
        ('cancel','cancel'),
        ('etc','etc'),
    )
    title = models.CharField(null=False, blank=False, max_length=300)
    writer = models.CharField(null=False, blank=False, max_length=300)
    body = models.TextField()
    content = models.CharField(null=False, blank=False, choices=CONTENT_TYPE_CHOICE, max_length=300)
    sub_body = models.TextField()
    created_at  = models.DateTimeField(auto_now_add=True, verbose_name="생성일")
    updated_at  = models.DateTimeField(auto_now=True, verbose_name="수정일")

    def __str__(self):
        return self.title