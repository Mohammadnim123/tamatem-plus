from rest_framework.routers import DefaultRouter
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from eCommerce.apis.views.products import ProductsAPIView, PublicProductsAPIView


api_router = DefaultRouter()

api_router.register('products', ProductsAPIView, basename='products')
api_router.register('products', PublicProductsAPIView, basename='products')

urlpatterns = api_router.urls

urlpatterns += [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]