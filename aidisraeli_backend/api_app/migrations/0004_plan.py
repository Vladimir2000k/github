# Generated by Django 4.0.1 on 2022-01-28 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0003_blogpost_views'),
    ]

    operations = [
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('INTRO', 'Intro'), ('LITE', 'Lite'), ('STARTER', 'Starter'), ('PRO', 'Pro'), ('TEAMS', 'Teams')], max_length=10)),
                ('price_monthly', models.DecimalField(decimal_places=2, max_digits=6)),
                ('price_yearly', models.DecimalField(decimal_places=2, max_digits=6)),
                ('credits_per_month', models.IntegerField()),
                ('languages', models.IntegerField()),
                ('initial_bonus_credits', models.IntegerField()),
                ('anti_plagiarism_checks', models.IntegerField()),
                ('max_projects', models.IntegerField()),
                ('max_workspaces', models.IntegerField()),
            ],
        ),
    ]
