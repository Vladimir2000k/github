from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from api_app.blog.models import *
from api_app.personal_area.models import *


class CustomUser(AbstractUser):
    username = None
    first_name = None
    last_name = None
    USERNAME_FIELD = 'email'
    email = models.EmailField(_('email address'), unique=True)
    REQUIRED_FIELDS = []


class FeedbackEntry(models.Model):
    name = models.CharField(max_length=256)
    email = models.EmailField()
    message = models.TextField()


class ApiIntegrationRequest(models.Model):
    name = models.CharField(max_length=256)
    email = models.EmailField()
    message = models.TextField()


class Plan(models.Model):
    class PlanType(models.TextChoices):
        INTRO = 'INTRO', _('Intro')
        LITE = 'LITE', _('Lite')
        STARTER = 'STARTER', _('Starter')
        PRO = 'PRO', _('Pro')
        TEAMS = 'TEAMS', _('Teams')

    type = models.CharField(choices=PlanType.choices, max_length=10)
    monthly_price_for_month = models.DecimalField(max_digits=6, decimal_places=2)
    monthly_price_for_year = models.DecimalField(max_digits=6, decimal_places=2)

    price_of_additional_for_month = models.DecimalField(max_digits=6, decimal_places=2)
    price_of_additional_for_year = models.DecimalField(max_digits=6, decimal_places=2)

    credits_per_month = models.IntegerField()
    languages = models.IntegerField()
    initial_bonus_credits = models.IntegerField()
    anti_plagiarism_checks = models.IntegerField()
    max_projects = models.IntegerField()
    max_workspaces = models.IntegerField()

    def __str__(self):
        return self.type
