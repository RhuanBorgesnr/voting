from rest_framework import serializers
from .models import VotingSession

class VotingSessionSerializer(serializers.ModelSerializer):
    """
    Serializer for VotingSession model.
    """
    is_open = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = VotingSession
        fields = ['id', 'topic', 'start_time', 'duration_minutes', 'status', 'is_open']
        read_only_fields = ['id', 'start_time', 'status', 'topic', 'is_open']

    def get_is_open(self, obj):
        return obj.is_open