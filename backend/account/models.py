from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, name, phonenumber, email=None, password=None, **extra_fields):
        if not name:
            raise ValueError("The Name field is required")
        if not phonenumber:
            raise ValueError("The PhoneNumber field is required")
        if not email:
            raise ValueError("The Email field is required")

        user = self.model(name=name, phonenumber=phonenumber, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, name, phonenumber, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_verified', True)

        return self.create_user(name, phonenumber, email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    UserTypes = [
        ('captain', 'captain'),
        ('vice_captain', 'vice_captain'),
        ('normal', 'normal'),
    ]

    name = models.CharField(max_length=255)
    phonenumber = models.CharField(max_length=11, unique=True)
    email = models.EmailField(max_length=255, unique=True, null=True, blank=True)
    user_type = models.CharField(max_length=20, choices=UserTypes, default='normal')

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'phonenumber'
    REQUIRED_FIELDS = ['name', 'email']

    def __str__(self):
        return f"{self.name} - {self.phonenumber}"
