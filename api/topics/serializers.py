from rest_framework import serializers
from .models import Topic

class TopicSerializer(serializers.ModelSerializer):
    """
    Serializer for Topic model.
    """
    class Meta:
        model = Topic
        fields = ['id', 'title', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']