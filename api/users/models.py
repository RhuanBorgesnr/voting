from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import RegexValidator


class User(AbstractUser):
    """
    Custom user model extending AbstractUser with CPF field.
    
    This model provides a custom user implementation with additional
    CPF (Brazilian tax ID) field for user identification.
    """
    
    cpf = models.CharField(
        max_length=11,
        unique=True,
        null=True,
        blank=True,
        validators=[
            RegexValidator(
                regex=r'^\d{11}$',
                message='CPF must contain exactly 11 digits.',
                code='invalid_cpf'
            )
        ],
        help_text='Brazilian CPF (tax ID) - 11 digits only'
    )
    
    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
    
    def __str__(self):
        return self.username or self.email
  