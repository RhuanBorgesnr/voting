from django.urls import path
from .views import VotingSessionCreateView, VotingSessionDetailView

urlpatterns = [
    path('topics/<int:topic_id>/session/', VotingSessionCreateView.as_view(), name='voting-session-create'),

    path('sessions/<int:pk>/', VotingSessionDetailView.as_view(), name='voting-session-detail'),
]