from django.db import models
from django.utils.html import format_html

# Create your models here.
class Image(models.Model):
    image = models.ImageField()

    def __str__(self):
        return self.image.name

    def image_tag(self):
        if self.image:
            return format_html('<img src="{}" height="50"/>'.format(self.image.url))
        return format_html('<img src="{}" height="50"/>'.format("https: // missioninfra.net/img/noimg/noimg_4x3.gif"))
        image_tag.short_description = 'image'