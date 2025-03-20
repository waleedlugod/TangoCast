from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserModel

class CustomUserAdmin(UserModel):
    model = UserModel
    fieldsets = UserAdmin.fieldsets + (
        ('Custom Fields', {'fields': ('role',)}),
    )

admin.site.register(UserModel, CustomUserAdmin)