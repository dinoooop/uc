from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import car_list



urlpatterns = [
    path('', car_list, name='car_list'),
]
