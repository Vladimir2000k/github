from .base import *

DATABASES['default']['HOST'] = env('POSTGRES_HOST')
DATABASES['default']['PORT'] = env('POSTGRES_PORT')
