from django.urls import path

from api_app.plans.views import PlansViewSet

urlpatterns = [
    path('plans/', PlansViewSet.as_view({'get': 'list'})),
]
