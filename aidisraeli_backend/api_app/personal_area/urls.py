from django.urls import path

from api_app.personal_area.views import PersonalBalanceViewSet, PersonalWorkspaceViewSet, PersonalProjectViewSet

urlpatterns = [
    path('personal-area/balance', PersonalBalanceViewSet.as_view({'get': 'retrieve'})),
    path('personal-area/workspaces', PersonalWorkspaceViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('personal-area/workspaces/<int:pk>', PersonalWorkspaceViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'delete'})),
    path('personal-area/workspaces/<int:workspace_id>/projects', PersonalProjectViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('personal-area/workspaces/<int:workspace_id>/projects/<int:pk>', PersonalProjectViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'delete'})),
    path('personal-area/balance', PersonalBalanceViewSet.as_view({'get': 'retrieve'})),

]
