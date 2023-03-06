from .base import *

DATABASES['default']['HOST'] = env('POSTGRES_HOST_LOCAL')
DATABASES['default']['PORT'] = env('POSTGRES_PORT_LOCAL')
