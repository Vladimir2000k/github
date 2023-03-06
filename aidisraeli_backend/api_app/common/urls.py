from ..feedback.urls import urlpatterns as feedback_urls
from ..blog.urls import urlpatterns as blog_urls
from ..plans.urls import urlpatterns as plan_urls
from ..auth.urls import urlpatterns as auth_urls
from ..personal_area.urls import urlpatterns as personal_area_urls

urlpatterns = feedback_urls + blog_urls + plan_urls + auth_urls + personal_area_urls
