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
        "codigo": "uf",
        "nombre": "Unidad de fomento (UF)",
        "unidad_medida": "Pesos",
        "serie": [
            {"fecha": "2025-04-27T04:00:00.000Z", "valor": 39055.92},
            {"fecha": "2025-04-26T04:00:00.000Z", "valor": 39049.43},
            {"fecha": "2025-04-25T04:00:00.000Z", "valor": 39042.94},
            {"fecha": "2025-04-24T04:00:00.000Z", "valor": 39036.45},
            {"fecha": "2025-04-23T04:00:00.000Z", "valor": 39029.96},
            {"fecha": "2025-04-22T04:00:00.000Z", "valor": 39023.47},
            {"fecha": "2025-04-21T04:00:00.000Z", "valor": 39016.98},
            {"fecha": "2025-04-20T04:00:00.000Z", "valor": 39010.5},
            {"fecha": "2025-04-19T04:00:00.000Z", "valor": 39004.01},
            {"fecha": "2025-04-18T04:00:00.000Z", "valor": 38997.53},
            {"fecha": "2025-04-17T04:00:00.000Z", "valor": 38991.04},
            {"fecha": "2025-04-16T04:00:00.000Z", "valor": 38984.56},
            {"fecha": "2025-04-15T04:00:00.000Z", "valor": 38978.08},
            {"fecha": "2025-04-14T04:00:00.000Z", "valor": 38971.6},
            {"fecha": "2025-04-13T04:00:00.000Z", "valor": 38965.12},
            {"fecha": "2025-04-12T04:00:00.000Z", "valor": 38958.65},
            {"fecha": "2025-04-11T04:00:00.000Z", "valor": 38952.17},
            {"fecha": "2025-04-10T04:00:00.000Z", "valor": 38945.69},
            {"fecha": "2025-04-09T04:00:00.000Z", "valor": 38939.22},
            {"fecha": "2025-04-08T04:00:00.000Z", "valor": 38934.2},
            {"fecha": "2025-04-07T04:00:00.000Z", "valor": 38929.19},
            {"fecha": "2025-04-06T04:00:00.000Z", "valor": 38924.18},
            {"fecha": "2025-04-05T03:00:00.000Z", "valor": 38919.16},
            {"fecha": "2025-04-04T03:00:00.000Z", "valor": 38914.15},
            {"fecha": "2025-04-03T03:00:00.000Z", "valor": 38909.14},
            {"fecha": "2025-04-02T03:00:00.000Z", "valor": 38904.13},
            {"fecha": "2025-04-01T03:00:00.000Z", "valor": 38899.12},
            {"fecha": "2025-03-31T03:00:00.000Z", "valor": 38894.11},
            {"fecha": "2025-03-30T03:00:00.000Z", "valor": 38889.1},
            {"fecha": "2025-03-29T03:00:00.000Z", "valor": 38884.1},
            {"fecha": "2025-03-28T03:00:00.000Z", "valor": 38879.09},
        ],
    }

    with patch("modules.dolar.requests.get") as mock_get:
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = fake_response

        response = client.post(
            "/chatbot", json={"texto": "Cuál es el valor de la UF"}
        )

        assert response.status_code == 200
        assert "$39,055.92 pesos chilenos" in response.get_json()["respuesta"]
