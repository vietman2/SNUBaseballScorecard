# Use the official Python base image
FROM python:3.9

WORKDIR /app

COPY Pipfile /app
COPY Pipfile.lock /app

RUN pip install pipenv && \
    pipenv install --deploy --system

COPY . /app
CMD ["uwsgi", "--http", ":8000", "--ini", "uwsgi.ini"]