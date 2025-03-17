from django.contrib import admin
from .models import SharedPodcast

@admin.register(SharedPodcast)
class SharedPodcastAdmin(admin.ModelAdmin):
    list_display = ('podcast', 'shared_by', 'shared_at', 'share_link')
    search_fields = ('podcast__title', 'shared_by__username')
    list_filter = ('shared_at',)
