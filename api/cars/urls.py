from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import car_list, car_store, car_update, car_delete



urlpatterns = [
    path('', car_list, name='car_list'),
    path('store/', car_store, name='car_store'),
    path('update/', car_update, name='car_update'),
    path('delete/', car_delete, name='car_delete'),
]
