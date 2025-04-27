from flask import Flask
import pytest
from modules.chatbot_bp import chatbot_bp

@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(chatbot_bp)
    app.testing = True
    with app.test_client() as client:
        yield client


def test(client):
    response = client.post("/chatbot", json={"texto": "Dame el clima y el valor del dólar"})

    assert response.status_code == 200
    assert response.get_json() == {"respuesta": "Lo siento, no entiendo tu pregunta. ¿Puedes reformularla? 🥺"}
