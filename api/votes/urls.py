from django.urls import path
from .views import VoteCreateView, TopicResultView, CheckUserVoteView

urlpatterns = [
    path('topics/<int:topic_id>/vote/', VoteCreateView.as_view(), name='vote-create'),
    path('topics/<int:topic_id>/result/', TopicResultView.as_view(), name='topic-result'),
    path('topics/<int:topic_id>/check-vote/', CheckUserVoteView.as_view(), name='check-user-vote'),
]