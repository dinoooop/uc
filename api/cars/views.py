from core.utils.image_utils import process_cropped_image
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.db.models import Q
from .models import Car
from .serializers import CarSerializer
from .pagination import CustomPagination
from io import BytesIO
from django.core.files.base import ContentFile


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


@api_view(['POST'])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def car_store(request):
    """
    Create a new Car entry with shared image cropping utility.
    """
    data = request.data.copy()

    processed_image = process_cropped_image(request, "image")
    if isinstance(processed_image, Response):
        return processed_image

    if processed_image:
        data["image"] = processed_image

    serializer = CarSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH'])
@parser_classes([MultiPartParser, FormParser])
def car_update(request, pk):
    """
    Update an existing Car entry (supports image upload)
    """
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

    partial = request.method == 'PATCH'
    serializer = CarSerializer(car, data=request.data, partial=partial)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def car_delete(request, pk):
    """
    Delete a Car entry
    """
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

    car.delete()
    return Response({'message': 'Car deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
