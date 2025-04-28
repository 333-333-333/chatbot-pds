from flask import Flask
from unittest.mock import patch
import pytest
from modules.chatbot_bp import chatbot_bp

"""Pruebas para el Requisito Funcional 08, parte 1: Respuestas específicas a consultas comunes."""
@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(chatbot_bp)
    app.testing = True
    with app.test_client() as client:
        yield client


def test_FR08_2_consulta_uf(client):
    """
    Test para verificar que el chatbot responde correctamente a consultas sobre el valor de la UF.
    
    El test comprueba que:
    1. El endpoint responde con código 200
    2. La respuesta contiene información relevante sobre la UF
    3. Se maneja correctamente diferentes formas de preguntar por la UF
    """
    # Consultas de prueba para UF
    uf_queries = [
        "¿Cuál es el valor de la UF hoy?",
        "Precio actual de la UF",
        "UF valor",
    ]
    
    # Información que debe estar presente en la respuesta
    expected_content = [
        "uf",
        "36,253.65",
        "pesos"
    ]
    
    # Mock de respuesta de la API
    fake_response = {
        "version": "1.7.0",
        "autor": "mindicador.cl",
        "codigo": "uf",
        "nombre": "Unidad de fomento (UF)",
        "unidad_medida": "Pesos",
        "serie": [
            {"fecha": "2025-04-25T04:00:00.000Z", "valor": 36253.65},
            {"fecha": "2025-04-24T04:00:00.000Z", "valor": 36251.89},
            {"fecha": "2025-04-23T04:00:00.000Z", "valor": 36250.12},
            {"fecha": "2025-04-22T04:00:00.000Z", "valor": 36248.36},
            {"fecha": "2025-04-21T04:00:00.000Z", "valor": 36246.60},
            {"fecha": "2025-04-20T04:00:00.000Z", "valor": 36244.84},
            {"fecha": "2025-04-19T04:00:00.000Z", "valor": 36243.08},
            {"fecha": "2025-04-18T04:00:00.000Z", "valor": 36241.32},
            {"fecha": "2025-04-17T04:00:00.000Z", "valor": 36239.56},
            {"fecha": "2025-04-16T04:00:00.000Z", "valor": 36237.80},
        ],
    }

    with patch("modules.uf.requests.get") as mock_get:
        # Configurar el mock para retornar un valor predefinido
        mock_get.return_value.status_code = 200
        mock_get.return_value.json.return_value = fake_response

        for query in uf_queries:
            response = client.post("/chatbot", json={"texto": query})
            response_data = response.get_json()
            response_lower = response_data["respuesta"].lower()

            # Verificar código de respuesta
            assert response.status_code == 200, f"La petición falló para: '{query}'"
            
            # Verificar que la respuesta contenga información relevante
            assert all(content in response_lower for content in expected_content), \
                   f"La respuesta no contiene la información esperada para: '{query}'\nRespuesta: {response_data['respuesta']}"
