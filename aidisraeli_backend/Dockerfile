# Pull base image
FROM python:3.9-slim

# Set environment varibles
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=aidisraeli_proj.settings.dockerised

# Install dependencies
RUN pip install pipenv
COPY ./Pipfile ./Pipfile.lock /code/

# Set work directory
WORKDIR /code

RUN export PIPENV_MAX_SUBPROCESS=2 && pipenv sync

# Copy project
COPY ./ /code