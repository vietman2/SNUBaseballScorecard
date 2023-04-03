# Generated by Django 4.1.7 on 2023-04-03 07:40

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('team', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Player',
            fields=[
                ('student_id', models.CharField(max_length=10, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=10)),
                ('elite', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Player_Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('college', models.CharField(max_length=20)),
                ('department', models.CharField(max_length=20)),
                ('status', models.CharField(choices=[('학부', '학부'), ('대학원', '대학원'), ('교직원', '교직원'), ('연구원', '연구원'), ('교수', '교수'), ('와일드카드', '와일드카드'), ('휴학', '휴학')], max_length=5)),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='player.player')),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='team.team')),
            ],
        ),
    ]