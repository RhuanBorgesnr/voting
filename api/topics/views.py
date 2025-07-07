from rest_framework import generics, permissions
from .models import Topic
from .serializers import TopicSerializer

class TopicListCreateView(generics.ListCreateAPIView):
    """
    List all topics (public) and create new topic (protected).
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]


class TopicDetailView(generics.RetrieveAPIView):
    """
    Retrieve a specific topic (public).
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [permissions.AllowAny]