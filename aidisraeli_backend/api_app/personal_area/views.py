from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets, permissions
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

from api_app.personal_area.models import PersonalBalance, PersonalWorkspace, PersonalProject
from api_app.personal_area.serializers import PersonalBalanceSerializer, PersonalWorkspaceSerializer, \
    PersonalProjectSerializer


class PersonalBalanceViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, pk=None):
        instance = PersonalBalance.objects.filter(user_id=self.request.user.id).get()
        serialized_data = PersonalBalanceSerializer(instance).data
        used_workspaces = PersonalWorkspace.objects.filter(owner_id=request.user.id).count()
        used_projects = PersonalProject.objects.filter(workspace__owner_id=request.user.id).count()
        serialized_data['used_workspaces'] = used_workspaces
        serialized_data['used_projects'] = used_projects
        return Response(serialized_data)


class PersonalWorkspaceViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        instance = PersonalWorkspace.objects.filter(owner_id=self.request.user.id).all()
        return Response(PersonalWorkspaceSerializer(instance, many=True).data)

    def retrieve(self, request, pk=None):
        try:
            instance = PersonalWorkspace.objects.get(pk=pk)
        except ObjectDoesNotExist:
            raise NotFound()

        return Response(PersonalWorkspaceSerializer(instance).data)

    def create(self, request):
        data = {**request.data, "owner_id": request.user.id}
        ser = PersonalWorkspaceSerializer(data=data)
        ser.is_valid(raise_exception=True)
        new_workspace = ser.save()
        return Response(PersonalWorkspaceSerializer(new_workspace).data, status=201)

    def update(self, request, pk=None):
        workspace_to_edit = PersonalWorkspace.objects.get(pk=pk)
        if workspace_to_edit is None:
            raise NotFound("Couldn't find an instance with specified id")
        ser = PersonalWorkspaceSerializer(workspace_to_edit, data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        workspace = ser.save()
        return Response(PersonalWorkspaceSerializer(workspace).data)

    def delete(self, request, pk=None):
        obj = PersonalWorkspace.objects.get(pk=pk)
        if obj is None:
            raise NotFound("Couldn't find an instance with specified id")
        obj.delete()
        return Response(status=200)


class PersonalProjectViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]  # TODO check for workspace owner

    def list(self, request, workspace_id):
        instance = PersonalProject.objects.filter(workspace_id=workspace_id).all()
        return Response(PersonalProjectSerializer(instance, many=True).data)

    def retrieve(self, request, workspace_id, pk=None):
        try:
            instance = PersonalProject.objects.get(pk=pk)
        except ObjectDoesNotExist:
            raise NotFound()

        return Response(PersonalProjectSerializer(instance).data)

    def create(self, request, workspace_id):
        data = {**request.data, 'workspace': workspace_id}
        ser = PersonalProjectSerializer(data=data)
        ser.is_valid(raise_exception=True)
        new_proj = ser.save()
        return Response(PersonalProjectSerializer(new_proj).data, status=201)

    def update(self, request, workspace_id, pk=None):
        proj_to_edit = PersonalProject.objects.get(pk=pk)
        if proj_to_edit is None:
            raise NotFound("Couldn't find an instance with specified id")
        ser = PersonalProjectSerializer(proj_to_edit, data=request.data, partial=True)
        ser.is_valid(raise_exception=True)
        proj = ser.save()
        return Response(PersonalProjectSerializer(proj).data)

    def delete(self, request, workspace_id, pk=None):
        obj = PersonalProject.objects.get(pk=pk)
        if obj is None:
            raise NotFound("Couldn't find an instance with specified id")
        obj.delete()
        return Response(status=200)
