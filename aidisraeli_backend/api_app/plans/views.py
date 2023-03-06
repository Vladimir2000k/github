from rest_framework import viewsets

from api_app.models import Plan
from api_app.plans.serializers import PlanSerializer


class PlansViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
