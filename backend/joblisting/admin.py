from django.contrib import admin
from .models import CustomUser, Job, SavedJob

admin.site.register(CustomUser)
admin.site.register(Job)
admin.site.register(SavedJob)