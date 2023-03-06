from rest_framework import serializers

from .models import PersonalBalance, PersonalWorkspace, PersonalProject
from ..auth.serializers import CustomUserDetailsSerializer
from ..models import CustomUser
from ..plans.serializers import PlanSerializer


class PersonalBalanceSerializer(serializers.ModelSerializer):
    plan = PlanSerializer()

    class Meta:
        model = PersonalBalance
        fields = ['pk', 'user', 'workspaces_additional', 'projects_additional', 'credits', 'antiplagiarism_checks',
                  'plan', 'days_before_subscription_expires', 'next_plan_prolongation_date']


class PersonalProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalProject
        fields = ['pk', 'workspace', 'name', 'description', 'source_lang', 'target_lang']


class PersonalWorkspaceSerializer(serializers.ModelSerializer):
    owner = CustomUserDetailsSerializer(read_only=True)
    owner_id = serializers.PrimaryKeyRelatedField(write_only=True, queryset=CustomUser.objects.all())

    projects = PersonalProjectSerializer(many=True, read_only=True)

    class Meta:
        model = PersonalWorkspace
        fields = ['pk', 'name', 'owner', 'owner_id', 'creation_date', 'projects']
        read_only_fields = ['projects']

    def create(self, validated_data):
        data = {**validated_data, 'owner': validated_data['owner_id']}
        del data['owner_id']
        workspace = PersonalWorkspace(**data)
        workspace.save()
        return workspace
