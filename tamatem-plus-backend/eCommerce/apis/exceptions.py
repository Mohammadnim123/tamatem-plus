from rest_framework.exceptions import APIException


class ProductNotFoundException(APIException):
    status_code = 404
    default_detail = 'Product not found.'