from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views



urlpatterns = [
    path('', views.car_list, name='car_list'),
    path('show/<int:pk>/', views.car_show, name='car_show'),
    path('store/', views.car_store, name='car_store'),
    path('update/<int:pk>/', views.car_update, name='car_update'),
    path('delete/<int:pk>/', views.car_delete, name='car_delete'),
]
