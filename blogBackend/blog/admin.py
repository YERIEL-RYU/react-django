from django.contrib import admin
from .models import Post, Reply


admin.site.register(Post)
admin.site.register(Reply)

# super user
# user name : user1
#password : user1
