from django.db import models #type: ignore
from django.utils import timezone #type: ignore

class Todo(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    title = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    completed = models.BooleanField(default=False)
    priority = models.CharField(max_length=6, choices=PRIORITY_CHOICES, default='medium')
    reminder_time = models.DateTimeField(null=True, blank=True)
    expired = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.reminder_time and self.reminder_time < timezone.now() and not self.completed:
            self.expired = True
        else:
            self.expired = False
        super(Todo, self).save(*args, **kwargs)


    def __str__(self):
        return self.title

