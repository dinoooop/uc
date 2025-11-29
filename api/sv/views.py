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
        'min_year': 1987,
        'max_year': datetime.now().year,
        'min_price': 0,
        'max_price': special_ceil(Car.objects.all().order_by('-price').first().price) * 10,
        'min_travelled': special_floor(Car.objects.all().order_by('travelled').first().travelled),
        'max_travelled': special_ceil(Car.objects.all().order_by('-travelled').first().travelled),
        'min_mileage': 0,
        'max_mileage': 100,
        'brands': brands_list,
    }
    return Response(data)
