from api_app.models import FeedbackEntry, Plan, ApiIntegrationRequest, CustomUser
from api_app.blog.models import BlogPost

from .personal_area.admin import *


@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['email']


@admin.register(FeedbackEntry)
class FeedbackEntryAdmin(admin.ModelAdmin):
    list_display = [field.name for field in FeedbackEntry._meta.get_fields()]


@admin.register(ApiIntegrationRequest)
class ApiIntegrationRequestAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ApiIntegrationRequest._meta.get_fields()]


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'photo', 'views', 'date_created', 'summary']


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Plan._meta.get_fields() if field.name not in ['personalbalance']]
