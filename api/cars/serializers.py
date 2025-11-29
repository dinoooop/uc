from userapp.serializers import UserSerializer
from brands.serializers import BrandSerializer
from rest_framework import serializers
from .models import Car
from brands.models import Brand

class CarSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    owner = UserSerializer(read_only=True)
    brand_id  = serializers.PrimaryKeyRelatedField(
        queryset=Brand.objects.all(),
        source='brand',
        write_only=True,
        required=False
    )
    class Meta:
        model = Car
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        return Car.objects.create(owner=user, **validated_data)
