FROM python:3.12-slim

# Send output streams straight into the terminal, which makes debugging easier
ENV PYTHONUNBUFFERED=1

# Install project dependencies
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the code
COPY . .

# Set Flask environment variables
ENV FLASK_APP=chatbot_api.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=development
ENV FLASK_DEBUG=1
ENV FLASK_RUN_PORT=5000

# Run the Flask app
CMD ["flask", "run"]
