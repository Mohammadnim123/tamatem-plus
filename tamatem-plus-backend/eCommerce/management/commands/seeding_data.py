# In create_products.py inside your_app/management/commands directory

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from eCommerce.models import Product

class Command(BaseCommand):
    help = 'Creates a superuser and 3 records for the Product model'

    def handle(self, *args, **options):
        # Create a superuser
        User.objects.create_superuser('admin@example.com', 'admin@example.com', 'Mohammad.123')

        # Create 3 records for the Product model
        products_data = [
            {
                'title': 'Product 1',
                'price': 10.99,
                'description': 'Description for Product 1',
                'image': 'https://picsum.photos/200/300'
            },
            {
                'title': 'Product 2',
                'price': 19.99,
                'description': 'Description for Product 2',
                'image': 'https://picsum.photos/200/300'
            },
            {
                'title': 'Product 3',
                'price': 29.99,
                'description': 'Description for Product 3',
                'image': 'https://picsum.photos/200/300'
            }
        ]

        for data in products_data:
            Product.objects.create(**data)

        self.stdout.write(self.style.SUCCESS('Superuser created successfully'))
        self.stdout.write(self.style.SUCCESS('Three products created successfully'))
