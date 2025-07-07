from django.db import models
from django.conf import settings
from topics.models import Topic

class Vote(models.Model):
    """
    Model representing a user's vote on a topic.
    """
    CHOICES = (
        ('yes', 'Sim'),
        ('no', 'Não'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='votes')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE, related_name='votes')
    choice = models.CharField(max_length=3, choices=CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'topic')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} votou {self.choice} em {self.topic.title}"
