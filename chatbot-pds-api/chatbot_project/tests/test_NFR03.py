from flask import Flask
import pytest
import requests
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
    with patch("modules.dolar.requests.get") as mock_get:
        mock_get.side_effect = requests.exceptions.Timeout

        response = client.post(
            "/chatbot", json={"texto": "Quiero saber el pronóstico del tiempo en Barcelona"}
        )

        assert response.status_code == 200
        assert response.get_json()["respuesta"]["tipo"] == "error"
        assert response.get_json()["respuesta"]["mensaje"] == "La solicitud tardó más de lo esperado. Inténtalo de nuevo más tarde."
