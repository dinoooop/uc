from django.urls import path
from . import views

urlpatterns = [
    path('', views.brand_list, name='brand_list'),
    path('show/<int:pk>/', views.brand_show, name='brand_show'),
    path('store/', views.brand_store, name='brand_store'),
    path('update/<int:pk>/', views.brand_update, name='brand_update'),
    path('delete/<int:pk>/', views.brand_delete, name='brand_delete'),
]
