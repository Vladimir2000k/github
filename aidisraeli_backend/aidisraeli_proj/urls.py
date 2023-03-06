from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='admin/', permanent=False), name='index'),
    path('admin/', admin.site.urls),
    path('api/', include('api_app.common.urls')),
]

urlpatterns += path(f'{settings.FRONT_EMAIL_CONFIRM_ROUTE}/<str:key>',
                    csrf_exempt(lambda request, key:
                                HttpResponse('Не удалось подтвердить адрес электронной почты, внутреняя ошибка',
                                             status=404)),
                    name='account_confirm_email'),
urlpatterns += path(f'{settings.FRONT_PASSWORD_RESET_CONFIRM_ROUTE}/<str:uid>/<str:token>',
                    csrf_exempt(lambda request, uid, token:
                                HttpResponse('Не удалось сбросить пароль, внутреняя ошибка',
                                             status=404)),
                    name='password_reset_confirm'),

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
