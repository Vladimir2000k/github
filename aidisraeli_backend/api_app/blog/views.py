from rest_framework import viewsets
from rest_framework.response import Response

from api_app.blog.serializers import BlogPostSerializer, BlogPostDetailSerializer
from api_app.blog.models import BlogPost


class BlogPostsViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.order_by('-date_created', '-id').all()
    serializer_class = BlogPostSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views = instance.views + 1
        instance.save()
        ser_context = self.get_serializer_context()
        serializer = BlogPostDetailSerializer(instance, context=ser_context)
        return Response(serializer.data)
