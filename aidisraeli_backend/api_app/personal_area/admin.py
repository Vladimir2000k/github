from django.contrib import admin

from .models import PersonalBalance, PersonalBalanceTransaction, PersonalWorkspace, PersonalProject


@admin.register(PersonalBalance)
class PersonalBalanceAdmin(admin.ModelAdmin):
    list_display = [field.name for field in PersonalBalance._meta.get_fields() if field.name not in ['personalbalancetransaction']]
    readonly_fields = ['workspaces_additional', 'projects_additional', 'credits', 'antiplagiarism_checks']


@admin.register(PersonalBalanceTransaction)
class PersonalBalanceTransactionAdmin(admin.ModelAdmin):
    list_display = [field.name for field in PersonalBalanceTransaction._meta.get_fields()]


@admin.register(PersonalWorkspace)
class PersonalWorkspaceAdmin(admin.ModelAdmin):
    list_display = [field.name for field in PersonalWorkspace._meta.get_fields() if field.name not in ['projects']]


@admin.register(PersonalProject)
class PersonalProjectAdmin(admin.ModelAdmin):
    list_display = [field.name for field in PersonalProject._meta.get_fields()]
