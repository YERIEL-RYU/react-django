# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

app_name = 'post'

post_router = DefaultRouter()
post_router.register(r'', views.PostViewSet)

reply_router = DefaultRouter()
reply_router.register(r'', views.ReplyViewSet)

urlpatterns = [
    path('blog/', include(post_router.urls)),
    path('reply/', include(reply_router.urls))
]
