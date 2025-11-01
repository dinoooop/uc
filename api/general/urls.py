from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views



urlpatterns = [
    path('regular/', views.regular, name='regular'),
    path('contact-submit/', views.contact_submit, name='contact_submit'),

]
