from cars.filters import apply_filters
from core.utils.image_curve import img_resize, img_save_crop
from rest_framework.decorators import api_view, parser_classes, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from .models import Car
from .serializers import CarSerializer
from .pagination import CustomPagination
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
def car_list(request):
    cars = Car.objects.all() 
    cars = apply_filters(cars, request.query_params)
    cars = cars.order_by('-id')
    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(cars, request)
    serializer = CarSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def car_show(request, pk):
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response({'detail': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = CarSerializer(car)
    return Response(serializer.data)
    

@api_view(['POST'])
@parser_classes([JSONParser, MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def car_store(request):
    data = request.data.copy()
    data["owner"] = request.user.id 
    data["image"] = img_save_crop(request, 'image')
    if data["image"]:
        img_resize(data["image"], "car_image")
        
    serializer = CarSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT', 'PATCH'])
@parser_classes([JSONParser, MultiPartParser, FormParser])
def car_update(request, pk):
    """
    Update an existing Car entry (supports image upload)
    """
    try:
        car = Car.objects.get(pk=pk)
    except Car.DoesNotExist:
        return Response({'error': 'Car not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()
    data["image"] = img_save_crop(request, 'image')
    if data["image"]:
        img_resize(data["image"], "car_image")
        
    partial = request.method == 'PATCH'
    serializer = CarSerializer(car, data=data, partial=partial)
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
