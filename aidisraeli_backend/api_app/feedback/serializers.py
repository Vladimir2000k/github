from rest_framework import serializers

from api_app.models import FeedbackEntry, ApiIntegrationRequest


class FeedbackEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedbackEntry
        fields = ['name', 'email', 'message']


class ApiIntegrationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiIntegrationRequest
        fields = ['name', 'email', 'message']

