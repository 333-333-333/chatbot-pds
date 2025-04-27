from flask import Flask
import pytest
from modules.chatbot_bp import chatbot_bp
from unittest.mock import patch

@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(chatbot_bp)
    app.testing = True
    with app.test_client() as client:
        yield client


def test(client):
    fake_response = {
        "cod": 401,
        "message": "Invalid API key. Please see https://openweathermap.org/faq#error401 for more info."
    }

    with patch("modules.weather.requests.get") as mock_get:
        mock_get.return_value.status_code = 401
        mock_get.return_value.json.return_value = fake_response

        response = client.post("/chatbot", json={"texto": "Dame el clima en Santiago"})

        assert response.status_code == 200
        assert response.get_json()["respuesta"]["tipo"] == "error"
        assert response.get_json()["respuesta"]["datos"] == {}
