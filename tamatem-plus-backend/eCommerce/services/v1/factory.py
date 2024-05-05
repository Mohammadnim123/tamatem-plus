class ServiceFactory:
    _services = {}

    version = 'v1'

    @classmethod
    def register(cls, service_name):
        def decorator(service_class):

            if service_name in cls._services:
                raise ValueError("Service {} is already registered with {}".format(service_name, service_class.__name__))

            cls._services[service_name] = service_class

            return service_class

        return decorator

    @classmethod
    def get_instance(cls, service_name, *args, **kwargs):

        if service_name not in cls._services:
            raise ValueError("Service {} is not registered".format(service_name))

        instance = cls._services[service_name](*args, **kwargs)
        instance.factory = cls

        return instance
