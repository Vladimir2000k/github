from django.urls import path

from api_app.feedback.views import FeedbacksViewSet, ApiIntegrationRequestViewSet

urlpatterns = [
    path('feedbacks/', FeedbacksViewSet.as_view({'post': 'createProject'})),
    path('api-integration-requests/', ApiIntegrationRequestViewSet.as_view({'post': 'createProject'})),
]
