from django.urls import path, include
from eCommerce.urls import v1

urlpatterns = [
    path('v1/', include(v1), name="v1"),
]