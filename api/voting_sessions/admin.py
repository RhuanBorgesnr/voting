from django.contrib import admin
from .models import VotingSession

@admin.register(VotingSession)
class VotingSessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'topic', 'start_time', 'duration_minutes', 'status')
    list_filter = ('status',)
    search_fields = ('topic__title',)
    ordering = ('-start_time',)
