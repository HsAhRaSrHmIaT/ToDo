from django.db import models #type: ignore

class Todo(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    completed = models.BooleanField(default=False)


    def __str__(self):
        return self.title

