from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Car
from .serializers import CarSerializer
from .pagination import CustomPagination


@api_view(['GET'])
def car_list(request):
    search_query = request.query_params.get('search', '')

    cars = Car.objects.all()
    if search_query:
        cars = cars.filter(
            Q(name__icontains=search_query) |
            Q(brand__icontains=search_query)
        )
    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(cars, request)
    serializer = CarSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

