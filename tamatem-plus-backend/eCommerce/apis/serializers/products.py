from rest_framework import serializers
from .base import BaseSerializer


class ProductsSerializer(BaseSerializer):
    title = serializers.CharField(max_length=255)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    image = serializers.URLField()


class ExtendedProductsSerializer(ProductsSerializer):
    id = serializers.IntegerField()


class ProductsDetailsSerializer(ExtendedProductsSerializer):
    description = serializers.CharField(max_length=5000) 


class UpdateProductParamsSerializer(ProductsSerializer):
    description = serializers.CharField() 