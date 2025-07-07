from django.contrib import admin
from .models import Vote

@admin.register(Vote)
class VoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'topic', 'choice', 'created_at')
    search_fields = ('user__username', 'topic__title')
    list_filter = ('choice',)
    ordering = ('-created_at',)