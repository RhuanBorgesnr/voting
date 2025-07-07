from rest_framework import serializers
from .models import Vote

class VoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Vote
        fields = ['id', 'user', 'topic', 'choice', 'created_at']
        read_only_fields = ['id', 'user', 'topic', 'created_at']
