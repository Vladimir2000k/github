from django.shortcuts import render
from rest_framework import viewsets

from api_app.feedback.serializers import FeedbackEntrySerializer, ApiIntegrationRequestSerializer
from api_app.models import FeedbackEntry, ApiIntegrationRequest


class FeedbacksViewSet(viewsets.ModelViewSet):
    queryset = FeedbackEntry.objects.all()
    serializer_class = FeedbackEntrySerializer


class ApiIntegrationRequestViewSet(viewsets.ModelViewSet):
    queryset = ApiIntegrationRequest.objects.all()
    serializer_class = ApiIntegrationRequestSerializer
