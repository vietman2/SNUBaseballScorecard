from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, user_type, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(email=self.normalize_email(email), user_type=user_type)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None):
        user = self.create_user(email, 'admin', password)
        user.is_superuser = True
        user.is_staff = True
        user.is_referee = True
        user.save(using=self._db)
        return user
    
class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = (
        ('admin', 'admin'),
        ('referee', 'referee'),
        ('normal', 'normal'),
    )

    email = models.EmailField(max_length=255, unique=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='normal')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_referee = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_type']

    def __str__(self):
        return self.email