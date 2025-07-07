from django.db import models
from django.utils import timezone
from topics.models import Topic

class VotingSession(models.Model):
  
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('closed', 'Closed'),
    )
    
    
    topic = models.OneToOneField(Topic, on_delete=models.CASCADE)
    start_time = models.DateTimeField(default=timezone.now)
    duration_minutes = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=10, default='open')

    @property
    def is_open(self):
        if self.status != 'open':
            return False
        end_time = self.start_time + timezone.timedelta(minutes=self.duration_minutes)
        return timezone.now() < end_time

    def __str__(self):
        return f"Sessão de {self.topic.title}"
