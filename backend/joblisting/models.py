from django.contrib.auth.models import User
from django.db import models
from django.conf import settings

class CustomUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    USER_TYPE_CHOICES = (
        ('CANDIDATE', 'Candidate'),
        ('COMPANY', 'Company'),
    )

    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='CANDIDATE')

    def __str__(self):
        return self.user.username


class Job(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    company = models.CharField(max_length=200)

    def __str__(self):
        return self.title
    

# Saved Jobs list for candidate users
class SavedJob(models.Model):
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    candidate = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    class Meta:
        unique_together = ('job', 'candidate')

    def __str__(self):
        return f'{self.job.title} saved by {self.candidate.user.username}'