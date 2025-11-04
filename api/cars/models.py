from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

# Create your models here.

class Car(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    brand = models.CharField(max_length=100)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    travelled = models.IntegerField(help_text="Distance travelled in kilometers")
    mileage = models.DecimalField(max_digits=5, decimal_places=2, help_text="Mileage in km/l")
    owner = models.ForeignKey('auth.User', related_name='cars', on_delete=models.CASCADE)
    image = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.brand} {self.name} ({self.year})"