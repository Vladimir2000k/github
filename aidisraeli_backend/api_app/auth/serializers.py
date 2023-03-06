import datetime

from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer

from api_app.models import CustomUser, Plan
from api_app.personal_area.models import PersonalBalance


class CustomLoginSerializer(LoginSerializer):
    username = None


class CustomRegisterSerializer(RegisterSerializer):

    username = None

    def get_cleaned_data(self):
        return {
            "password1": self.validated_data.get("password1", ""),
            "email": self.validated_data.get("email", ""),
        }

    def save(self, request):
        user = super(CustomRegisterSerializer, self).save(request)
        intro_plan = Plan.objects.filter(type=Plan.PlanType.INTRO).get()
        PersonalBalance(
            plan=intro_plan,
            user_id=user.id,
            next_plan_prolongation_date=datetime.date.today() + datetime.timedelta(days=31),
            prolongations_left=-1,
            credits=intro_plan.initial_bonus_credits + intro_plan.credits_per_month,
            antiplagiarism_checks=intro_plan.anti_plagiarism_checks
        ).save()
        return user


class CustomUserDetailsSerializer(UserDetailsSerializer):
    class Meta:
        extra_fields = []
        if hasattr(CustomUser, 'USERNAME_FIELD'):
            extra_fields.append(CustomUser.USERNAME_FIELD)
        if hasattr(CustomUser, 'EMAIL_FIELD'):
            extra_fields.append(CustomUser.EMAIL_FIELD)
        model = CustomUser
        fields = ('pk', *extra_fields)
        read_only_fields = ('email',)
