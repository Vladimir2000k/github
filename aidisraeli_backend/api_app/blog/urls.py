from django.urls import path

from api_app.blog.views import BlogPostsViewSet

urlpatterns = [
    path('blog/', BlogPostsViewSet.as_view({'get': 'list'})),
    path('blog/<int:pk>', BlogPostsViewSet.as_view({'get': 'retrieve'})),
]
