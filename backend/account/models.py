from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class CustomUserManager(BaseUserManager):
    def create_user(self, email, user_type, password=None, phone_number=None):
        if not email:
            raise ValueError('Users must have an email address')
        
        user = self.model(
            email=self.normalize_email(email),
            user_type=user_type,
            phone_number=phone_number,    
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, phone_number=None):
        user = self.create_user(email, 'admin', password, phone_number)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user
    
class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = (
        (1, 'admin'),
        (2, 'referee'),
        (3, 'normal'),
    )

    email = models.EmailField(max_length=255, unique=True)
    phonenumber = models.CharField(max_length=15, unique=True, blank=True)
    user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES, default=3)
    is_phone_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_type', 'phone_number']

    def __str__(self):
        return self.email