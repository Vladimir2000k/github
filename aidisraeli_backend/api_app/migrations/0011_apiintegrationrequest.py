# Generated by Django 4.0.1 on 2022-02-03 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0010_remove_customuser_first_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ApiIntegrationRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=256)),
                ('email', models.EmailField(max_length=254)),
                ('message', models.TextField()),
            ],
        ),
    ]
