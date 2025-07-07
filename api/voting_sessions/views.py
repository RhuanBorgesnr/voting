from rest_framework import generics, permissions, status
from rest_framework.response import Response
from topics.models import Topic
from .models import VotingSession
from .serializers import VotingSessionSerializer

class VotingSessionCreateView(generics.CreateAPIView):

    
  serializer_class = VotingSessionSerializer
  permission_classes = [permissions.IsAuthenticated]
  
  def post(self, request, topic_id):

      try:
          topic = Topic.objects.get(pk=topic_id)
      except Topic.DoesNotExist:
          return Response({'detail': 'Topic not fund'}, status=404)
        
      if hasattr(topic, 'session'):
            return Response({'detail': 'Session already exists for this topic.'}, status=status.HTTP_400_BAD_REQUEST)
        
        
      duration_minutes = request.data.get('duration_minutes')
      if not duration_minutes:
         Response({'detail': 'duration_minutes is required'}, status=400)
         
      session, = VotingSession.objects.create(
        topic=topic,
        duration_minutes=duration_minutes,
        status='open'
      )
      
      serializer = self.get_serializer(session)
      return Response(serializer.data, status=201)


class VotingSessionDetailView(generics.RetrieveAPIView):
    queryset = VotingSession.objects.all()
    serializer_class = VotingSessionSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'pk'
