# Generated by Django 4.0.1 on 2022-02-17 12:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0011_apiintegrationrequest'),
    ]

    operations = [
        migrations.CreateModel(
            name='PersonalBalance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rooms_additional', models.IntegerField(default=0)),
                ('projects_additional', models.IntegerField(default=0)),
                ('credits', models.IntegerField(default=0)),
                ('antiplagiarism_checks', models.IntegerField(default=0)),
                ('next_plan_prolongation_date', models.DateField()),
                ('prolongations_left', models.IntegerField(default=0)),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='api_app.plan')),
            ],
        ),
        migrations.CreateModel(
            name='PersonalWorkspace',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('description', models.TextField()),
                ('workspace', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api_app.personalworkspace')),
            ],
        ),
        migrations.CreateModel(
            name='PersonalBalanceTransaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('cause', models.CharField(choices=[('BUY', 'Buy'), ('USE', 'Use'), ('MANUAL_MODIFY', 'Manual modify')], max_length=15)),
                ('rooms_additional', models.IntegerField(default=0)),
                ('projects_additional', models.IntegerField(default=0)),
                ('credits', models.IntegerField(default=0)),
                ('antiplagiarism_checks', models.IntegerField(default=0)),
                ('personal_balance', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api_app.personalbalance')),
            ],
        ),
    ]
