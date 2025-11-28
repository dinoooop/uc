from django.db import models

class Brand(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    logo = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
