from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    Custom admin interface for User model.
    """
    
    model = User
    list_display = ('username', 'email', 'first_name', 'last_name', 'cpf', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'is_superuser', 'groups')
    search_fields = ('username', 'email', 'first_name', 'last_name', 'cpf')
    ordering = ('username',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'cpf')}),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'first_name', 'last_name', 'cpf', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )
