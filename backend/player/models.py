from django.db import models

from team.models import Team

# Create your models here.

class Player(models.Model):
    student_id = models.CharField(max_length=10, primary_key=True, unique=True)
    second_id = models.CharField(max_length=10, null=True)
    name = models.CharField(max_length=10)
    elite = models.BooleanField(default=False)
    
class Player_Tournament(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    college = models.CharField(max_length=20)
    department = models.CharField(max_length=20)
    status = models.CharField(max_length=5, choices=[
        ('학부', '학부'), ('대학원', '대학원'), ('교직원', '교직원'), ('연구원', '연구원'), ('교수', '교수'), ('와일드카드', '와일드카드'), ('휴학', '휴학')
    ])
