# Generated by Django 4.2 on 2023-05-25 12:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0002_delete_team_group_stats'),
    ]

    operations = [
        migrations.AddField(
            model_name='team_record',
            name='initial_registration',
            field=models.BooleanField(default=False),
        ),
    ]
