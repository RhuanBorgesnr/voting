from django.test import TestCase
from django.contrib.auth import get_user_model
from topics.models import Topic
from .models import Vote

User = get_user_model()

class VoteModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='user1', password='testpass')
        self.topic = Topic.objects.create(title='Pauta Teste', description='Desc')

    def test_unique_vote_per_user_topic(self):
        Vote.objects.create(user=self.user, topic=self.topic, choice='yes')
        with self.assertRaises(Exception):
            Vote.objects.create(user=self.user, topic=self.topic, choice='no')

    def test_vote_count(self):
        user2 = User.objects.create_user(username='user2', password='testpass')
        Vote.objects.create(user=self.user, topic=self.topic, choice='yes')
        Vote.objects.create(user=user2, topic=self.topic, choice='no')
        yes_count = Vote.objects.filter(topic=self.topic, choice='yes').count()
        no_count = Vote.objects.filter(topic=self.topic, choice='no').count()
        self.assertEqual(yes_count, 1)
        self.assertEqual(no_count, 1)
