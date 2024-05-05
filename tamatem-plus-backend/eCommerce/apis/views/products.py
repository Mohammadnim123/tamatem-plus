from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from .base import AuthBaseAPIView, BaseAPIView
from ..serializers.products import ProductsSerializer,\
    ExtendedProductsSerializer, ProductsDetailsSerializer, UpdateProductParamsSerializer
from ...models import Product
from ..exceptions import ProductNotFoundException


class PublicProductsAPIView(BaseAPIView):
    service_class = 'products'
    version = 'v1'

    @swagger_auto_schema(
        method='get',
        operation_description="List all products",
        responses={
            status.HTTP_200_OK: ExtendedProductsSerializer(many=True)
        }
    )
    @action(['get'], detail=False)
    def list_products(self, request):
        service = self.get_service()
        products = service.list_products()
        products_data = ExtendedProductsSerializer(products, many=True)
        return Response(products_data.data, status=status.HTTP_200_OK)


    @swagger_auto_schema(
        method='get',
        operation_description="Get product Details",
        responses={
            status.HTTP_200_OK: ProductsDetailsSerializer()
        }
    )
    @action(['get'], detail=True)
    def get_product(self, request, pk):
        service = self.get_service()
        product = service.get_product(pk)
        product_data = ProductsDetailsSerializer(product)
        return Response(product_data.data, status=status.HTTP_200_OK)


class ProductsAPIView(AuthBaseAPIView):
    service_class = 'products'
    version = 'v1'


    @swagger_auto_schema(
        method='post',
        operation_description="Update product",
        request_body=UpdateProductParamsSerializer(),
        responses={
            status.HTTP_200_OK: ProductsDetailsSerializer()
        }
    )
    @action(['post'], detail=True)
    def update_product(self, request, pk):
        params = UpdateProductParamsSerializer(data=request.data)
        params.is_valid()

        try:
            product = Product.objects.get(pk=pk)
            product.title = params.data["title"]
            product.image = params.data["image"]
            product.price = params.data["price"]
            product.description = params.data["description"]
            product.save()
        except Product.DoesNotExist:
            raise ProductNotFoundException()

        product_data = ProductsDetailsSerializer(product)
        return Response(product_data.data, status=status.HTTP_200_OK)

