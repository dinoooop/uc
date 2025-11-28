from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from core.utils.image_curve import img_resize, img_save_crop
from .models import Brand
from .serializers import BrandSerializer
from cars.pagination import CustomPagination

@api_view(['GET'])
def brand_list(request):
    brands = Brand.objects.all().order_by('-id')
    paginator = CustomPagination()
    result_page = paginator.paginate_queryset(brands, request)
    serializer = BrandSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def brand_show(request, pk):
    try:
        brand = Brand.objects.get(pk=pk)
    except Brand.DoesNotExist:
        return Response({'detail': 'Brand not found'}, status=status.HTTP_404_NOT_FOUND)
    serializer = BrandSerializer(brand)
    return Response(serializer.data)

@api_view(['POST'])
def brand_store(request):
    data = request.data.copy()
    data["logo"] = img_save_crop(request, 'logo')
    if data["logo"]:
        img_resize(data["logo"], "default")
    serializer = BrandSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'PATCH'])
def brand_update(request, pk):
    try:
        brand = Brand.objects.get(pk=pk)
    except Brand.DoesNotExist:
        return Response({'detail': 'Brand not found'}, status=status.HTTP_404_NOT_FOUND)
    
    data = request.data.copy()
    data["logo"] = img_save_crop(request, 'logo')
    if data["logo"]:
        img_resize(data["logo"], "default")

    partial = request.method == "PATCH"
    serializer = BrandSerializer(brand, data=data, partial=partial)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def brand_delete(request, pk):
    try:
        brand = Brand.objects.get(pk=pk)
    except Brand.DoesNotExist:
        return Response({'detail': 'Brand not found'}, status=status.HTTP_404_NOT_FOUND)
    brand.delete()
    return Response({'message': 'Brand deleted'}, status=status.HTTP_204_NO_CONTENT)
