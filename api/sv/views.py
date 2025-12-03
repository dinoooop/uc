from django.shortcuts import render
from datetime import datetime
from cars.models import Car
from brands.models import Brand
from core.utils.basic import special_ceil, special_floor
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def regular(request):
    # Get min year from cars
    brands = Brand.objects.all().order_by('title')
    brands_list =[ {"label": b.title, "value": b.id} for b in brands]

    data = {
        'year_min': 1987,
        'year_max': datetime.now().year,
        'price_min': 0,
        'price_max': Car.objects.all().order_by('-price').first().price,
        'travelled_min': special_floor(Car.objects.all().order_by('travelled').first().travelled),
        'travelled_max': special_ceil(Car.objects.all().order_by('-travelled').first().travelled),
        'mileage_min': 0,
        'mileage_max': 100,
        'brands': brands_list,
        'currency': 'Rs.',
    }
    return Response(data)
