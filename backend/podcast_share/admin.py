from django.contrib import admin
from .models import SharedPodcast

class SharedPodcastAdmin(admin.ModelAdmin):
    list_display = ('podcast', 
                    'shared_by', 
                    'shared_at', 
                    'get_share_link') 

    def get_share_link(self, obj):
        return obj.get_share_link()
    
    get_share_link.short_description = "Share Link" 

admin.site.register(SharedPodcast, SharedPodcastAdmin)
