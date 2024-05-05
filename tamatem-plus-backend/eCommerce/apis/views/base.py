from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ViewSet
from eCommerce.services.v1.factory import ServiceFactory
from rest_framework.views import APIView


class BaseAPIView(ViewSet, APIView):
    service_class=None

    FACTORIES_VERSIONS = {
        'v1': ServiceFactory,
    }

    def get_factory(self):
        return self.FACTORIES_VERSIONS[self.version]

    def get_service(self):
        service = self.get_factory().get_instance(self.service_class)
        return service


class AuthBaseAPIView(BaseAPIView):
    permission_classes = (IsAuthenticated,)