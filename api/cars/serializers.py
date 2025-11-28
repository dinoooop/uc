from brands.serializers import BrandSerializer
from rest_framework import serializers
from .models import Car
from brands.models import Brand

class CarSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    write_brand = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source='brand',
        write_only=True,
        required=False
    )
    class Meta:
        model = Car
        fields = '__all__'
