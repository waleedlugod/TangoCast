from django.contrib import admin
from .models import Podcast

# Register your models here.
class PodcastAdmin(admin.ModelAdmin):
    pass

admin.site.register(Podcast, PodcastAdmin)