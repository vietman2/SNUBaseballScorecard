# Use the official Python base image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Install pipenv
RUN pip install --no-cache-dir pipenv

# Copy the Pipfile and Pipfile.lock into the container
COPY Pipfile Pipfile.lock ./

# Install the required dependencies using pipenv
RUN pipenv install --system --deploy --ignore-pipfile

# Copy the rest of the application code
COPY . .

# Expose the port your app will run on
EXPOSE 8000

# Start the Django app using Gunicorn
CMD ["gunicorn", "your_project.wsgi:application", "-w", "3", "-b", "0.0.0.0:8000"]
