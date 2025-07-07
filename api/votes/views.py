from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from topics.models import Topic
from .models import Vote
from .serializers import VoteSerializer
from django.db.models import Count
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class VoteCreateView(APIView):
    """
    Register a vote for a topic (protected, single vote per user/topic).
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, topic_id):
        logger.info(f"Vote attempt by user {request.user.username} on topic {topic_id}")
        
        try:
            topic = Topic.objects.get(pk=topic_id)
        except Topic.DoesNotExist:
            logger.warning(f"Topic {topic_id} not found")
            return Response({'detail': 'Topic not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Check if user already voted
        existing_vote = Vote.objects.filter(user=request.user, topic=topic).first()
        if existing_vote:
            logger.info(f"User {request.user.username} already voted on topic {topic_id}: {existing_vote.choice}")
            return Response({'detail': 'You have already voted on this topic.'}, status=status.HTTP_400_BAD_REQUEST)

        choice = request.data.get('choice')
        if choice not in ['yes', 'no']:
            logger.warning(f"Invalid choice '{choice}' by user {request.user.username}")
            return Response({'detail': 'Choice must be "yes" or "no".'}, status=status.HTTP_400_BAD_REQUEST)

        vote = Vote.objects.create(user=request.user, topic=topic, choice=choice)
        logger.info(f"Vote created: user {request.user.username} voted {choice} on topic {topic_id}")
        
        serializer = VoteSerializer(vote)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class CheckUserVoteView(APIView):
    """
    Check if user has already voted on a topic.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, topic_id):
        logger.info(f"Checking vote for user {request.user.username} on topic {topic_id}")
        
        try:
            topic = Topic.objects.get(pk=topic_id)
        except Topic.DoesNotExist:
            logger.warning(f"Topic {topic_id} not found")
            return Response({'detail': 'Topic not found.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            vote = Vote.objects.get(user=request.user, topic=topic)
            logger.info(f"User {request.user.username} has voted on topic {topic_id}: {vote.choice}")
            return Response({
                'has_voted': True,
                'vote': VoteSerializer(vote).data
            })
        except Vote.DoesNotExist:
            logger.info(f"User {request.user.username} has not voted on topic {topic_id}")
            return Response({
                'has_voted': False,
                'vote': None
            })


class TopicResultView(APIView):
    """
    Show voting result for a topic (public).
    """
    permission_classes = [permissions.AllowAny]

    def get(self, request, topic_id):
        try:
            topic = Topic.objects.get(pk=topic_id)
        except Topic.DoesNotExist:
            return Response({'detail': 'Topic not found.'}, status=status.HTTP_404_NOT_FOUND)

        votes = topic.votes.values('choice').annotate(count=Count('id'))
        result = {'yes': 0, 'no': 0}
        for v in votes:
            result[v['choice']] = v['count']

        return Response({
            'topic': topic.title,
            'result': result,
            'total_votes': sum(result.values())
        })
