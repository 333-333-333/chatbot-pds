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
        "version": "1.7.0",
        "autor": "mindicador.cl",
        "codigo": "dolar",
        "nombre": "Dólar observado",
        "unidad_medida": "Pesos",
        "serie": [
            {"fecha": "2025-04-25T04:00:00.000Z", "valor": 937.81},
            {"fecha": "2025-04-24T04:00:00.000Z", "valor": 938.02},
            {"fecha": "2025-04-23T04:00:00.000Z", "valor": 950.04},
            {"fecha": "2025-04-22T04:00:00.000Z", "valor": 961.14},
            {"fecha": "2025-04-21T04:00:00.000Z", "valor": 968.71},
            {"fecha": "2025-04-17T04:00:00.000Z", "valor": 969.23},
            {"fecha": "2025-04-16T04:00:00.000Z", "valor": 967.15},
            {"fecha": "2025-04-15T04:00:00.000Z", "valor": 966.07},
            {"fecha": "2025-04-14T04:00:00.000Z", "valor": 978.09},
            {"fecha": "2025-04-11T04:00:00.000Z", "valor": 988.97},
            {"fecha": "2025-04-10T04:00:00.000Z", "valor": 1000.01},
            {"fecha": "2025-04-09T04:00:00.000Z", "valor": 993.89},
            {"fecha": "2025-04-08T04:00:00.000Z", "valor": 990.68},
            {"fecha": "2025-04-07T04:00:00.000Z", "valor": 975.82},
            {"fecha": "2025-04-04T03:00:00.000Z", "valor": 946.59},
            {"fecha": "2025-04-03T03:00:00.000Z", "valor": 949.83},
            {"fecha": "2025-04-02T03:00:00.000Z", "valor": 946.28},
            {"fecha": "2025-04-01T03:00:00.000Z", "valor": 953.07},
            {"fecha": "2025-03-31T03:00:00.000Z", "valor": 946.1},
            {"fecha": "2025-03-28T03:00:00.000Z", "valor": 931.75},
            {"fecha": "2025-03-27T03:00:00.000Z", "valor": 920.98},
            {"fecha": "2025-03-26T03:00:00.000Z", "valor": 919.92},
            {"fecha": "2025-03-25T03:00:00.000Z", "valor": 926.41},
            {"fecha": "2025-03-24T03:00:00.000Z", "valor": 932.14},
            {"fecha": "2025-03-21T03:00:00.000Z", "valor": 926.15},
            {"fecha": "2025-03-20T03:00:00.000Z", "valor": 917.76},
            {"fecha": "2025-03-19T03:00:00.000Z", "valor": 917.97},
            {"fecha": "2025-03-18T03:00:00.000Z", "valor": 923.32},
            {"fecha": "2025-03-17T03:00:00.000Z", "valor": 932.36},
            {"fecha": "2025-03-14T03:00:00.000Z", "valor": 940.2},
            {"fecha": "2025-03-13T03:00:00.000Z", "valor": 932.28},
        ],
    }

    with patch("modules.dolar.requests.get") as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = fake_response

        response = client.post(
            "/chatbot", json={"texto": "Quiero saber el valor del dolar"}
        )

        assert response.status_code == 200
        assert "$937.81" in response.get_json()["respuesta"]
