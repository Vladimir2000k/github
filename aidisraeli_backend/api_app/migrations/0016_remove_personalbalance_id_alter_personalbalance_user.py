# Generated by Django 4.0.1 on 2022-02-17 14:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0015_alter_personalbalance_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='personalbalance',
            name='id',
        ),
        migrations.AlterField(
            model_name='personalbalance',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL),
        ),
    ]
