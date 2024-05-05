from .factory import ServiceFactory
from eCommerce.models import Product
from ...models import Product
from eCommerce.apis.exceptions import ProductNotFoundException


@ServiceFactory.register("products")
class ProductsService:
    def __init__(self) -> None:
        self.factory = None

    def list_products(self):
        return Product.objects.all()

    def get_product(self, product_id):
        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            raise ProductNotFoundException()
        return product