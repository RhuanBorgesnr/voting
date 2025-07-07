from django.db import models


class Topic(models.Model):

    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self) -> str:
        return self.title
      
      
      