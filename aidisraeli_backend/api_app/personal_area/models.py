import datetime

from django.conf import settings
from django.db import models, transaction
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import PermissionDenied


class PersonalWorkspace(models.Model):
    name = models.CharField(max_length=256)
    owner = models.ForeignKey('CustomUser', on_delete=models.CASCADE)
    creation_date = models.DateTimeField(auto_now_add=True)

    @transaction.atomic
    def save(self, *args, **kwargs):
        if self.pk is None:
            used_workspaces = PersonalWorkspace.objects.filter(owner_id=self.owner.pk).count()
            owners_balance = PersonalBalance.objects.filter(user_id=self.owner.id).get()
            if owners_balance.workspaces_available == used_workspaces:
                raise PermissionDenied('Workspaces limit reached for specified user')
        super(PersonalWorkspace, self).save(*args, **kwargs)


class PersonalProject(models.Model):
    workspace = models.ForeignKey(PersonalWorkspace, on_delete=models.CASCADE, related_name='projects')
    name = models.CharField(max_length=256)
    description = models.TextField()
    source_lang = models.CharField(max_length=2)
    target_lang = models.CharField(max_length=2)

    @transaction.atomic
    def save(self, *args, **kwargs):
        if self.pk is None:
            used_projects = PersonalProject.objects.filter(workspace__owner_id=self.workspace.owner.pk).count()
            owners_balance = PersonalBalance.objects.filter(user_id=self.workspace.owner.id).get()
            if owners_balance.projects_available == used_projects:
                raise PermissionDenied('Projects limit reached for specified user')
        super(PersonalProject, self).save(*args, **kwargs)


# TODO Constraint that BUY must be subtractive and buy - only additive
class PersonalBalanceTransaction(models.Model):
    class Cause(models.TextChoices):
        BUY = 'BUY', _('Buy')
        USE = 'USE', _('Use')
        MANUAL_MODIFY = 'MANUAL_MODIFY', _('Manual modify')

    personal_balance = models.ForeignKey('PersonalBalance', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True, null=False)
    cause = models.CharField(choices=Cause.choices, max_length=15, null=False, blank=False)
    workspaces_additional = models.IntegerField(default=0)
    projects_additional = models.IntegerField(default=0)
    credits = models.IntegerField(default=0)
    antiplagiarism_checks = models.IntegerField(default=0)

    @transaction.atomic
    def save(self, *args, **kwargs):
        if self.pk is None:
            personal_balance = PersonalBalance.objects.select_for_update().filter(pk=self.personal_balance_id).get()
            personal_balance.apply_balance_transaction(self)

            super(PersonalBalanceTransaction, self).save(*args, **kwargs)
        else:
            raise PermissionDenied('Transactions modification is restricted')


class PersonalBalance(models.Model):
    user = models.OneToOneField('CustomUser', primary_key=True, on_delete=models.CASCADE)
    workspaces_additional = models.PositiveIntegerField(default=0, blank=False, null=False)
    projects_additional = models.PositiveIntegerField(default=0, blank=False, null=False)
    credits = models.PositiveIntegerField(default=0, blank=False, null=False)
    antiplagiarism_checks = models.PositiveIntegerField(default=0, blank=False, null=False)
    plan = models.ForeignKey('Plan', on_delete=models.RESTRICT)
    next_plan_prolongation_date = models.DateField(blank=False, null=False)
    prolongations_left = models.IntegerField(default=0, blank=False, null=False)

    def days_before_subscription_expires(self):
        if self.prolongations_left != -1:
            days_until_prolongation = (self.next_plan_prolongation_date - datetime.date.today()).days
            next_prolongations_days = settings.DAYS_FOR_PROLONGATION * self.prolongations_left
            return days_until_prolongation + next_prolongations_days
        else:
            return -1

    __original_workspaces_additional = None
    __original_projects_additional = None
    __original_credits = None
    __original_antiplagiarism_checks = None

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.__original_workspaces_additional = self.workspaces_additional
        self.__original_projects_additional = self.projects_additional
        self.__original_credits = self.credits
        self.__original_antiplagiarism_checks = self.antiplagiarism_checks

    @property
    def workspaces_available(self):
        return self.plan.max_workspaces + self.workspaces_additional

    @property
    def projects_available(self):
        return self.plan.max_projects + self.projects_additional

    def save(self, force_insert=False, force_update=False, *args, **kwargs):
        def constraint_direct_update(old, new, label_for_msg):
            if old != new:
                raise PermissionDenied(
                    f'Attempt to modify {label_for_msg} directly. Consider using transaction for this')

        constraint_direct_update(self.__original_workspaces_additional, self.workspaces_additional,
                                 'additional workspaces')
        constraint_direct_update(self.__original_projects_additional, self.projects_additional, 'additional projects')
        constraint_direct_update(self.__original_credits, self.credits, 'credits count')
        constraint_direct_update(self.__original_antiplagiarism_checks, self.antiplagiarism_checks,
                                 'antiplagiarism checks')

        super(PersonalBalance, self).save(*args, **kwargs)

    def apply_balance_transaction(self, balance_transaction: PersonalBalanceTransaction):
        self.workspaces_additional += balance_transaction.workspaces_additional
        self.projects_additional += balance_transaction.projects_additional
        self.credits += balance_transaction.credits
        self.antiplagiarism_checks += balance_transaction.antiplagiarism_checks
        super(PersonalBalance, self).save()

    def __str__(self):
        return self.user.__str__()
