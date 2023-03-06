from django.db import models


class BlogPost(models.Model):
    title = models.CharField(max_length=256)
    content = models.TextField()
    photo = models.ImageField(upload_to='blog_images')
    views = models.IntegerField(default=0)
    date_created = models.DateTimeField(auto_created=True)

    @property
    def summary(self):
        return self.content[:750] + '...'
