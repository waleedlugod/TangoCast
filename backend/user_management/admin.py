from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserModel, CreatorModel


class CreatorInline(admin.StackedInline):
    model = CreatorModel
    verbose_name_plural = "Creator Info"
    fk_name = "creator_id"


class CustomUserAdmin(UserAdmin):
    model = UserModel
    inlines = (CreatorInline,)
    fieldsets = UserAdmin.fieldsets + (
        (
            "Custom Fields",
            {
                "fields": (
                    "role",
                    "bio",
                    "profile_photo",
                    "banner_photo",
                    "instagram_social",
                    "x_social",
                )
            },
        ),
    )

    def get_inline_instances(self, request, obj=...):
        if obj and obj.role == "createUser":
            return super().get_inline_instances(request, obj)
        return []


admin.site.register(UserModel, CustomUserAdmin)
