# Use the official Python image from the Docker Hub
FROM python:3.11.9

# Set the working directory in the container
WORKDIR /project

# Copy the requirements file into the container
COPY requirements.txt requirements.txt

# Install the required packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 5050

# Set environment variables
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
ENV TEMPLATES_AUTO_RELOAD=True

# Command to run the app
CMD ["flask", "run", "--port=5050"]
