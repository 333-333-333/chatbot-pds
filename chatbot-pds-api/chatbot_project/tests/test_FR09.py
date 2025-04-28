from flask import Flask
import pytest
from modules.chatbot_bp import chatbot_bp

"""Pruebas para el Requisito Funcional 09: Respuesta a consultas de monedas no soportadas."""
@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(chatbot_bp)
    app.testing = True
    with app.test_client() as client:
        yield client

def test_FR09_monedas_no_soportadas(client):
    """
    Test para verificar que el chatbot responde correctamente cuando se consulta por monedas
    que no están soportadas (diferentes a UF y Dólar).
    
    El test comprueba que:
    1. El endpoint responde con código 200
    2. La respuesta indica que la moneda no está soportada
    3. La respuesta menciona las monedas que sí son soportadas (UF y Dólar)
    """
    # Consultas de prueba para monedas no soportadas
    unsupported_currency_queries = [
        "¿Cuál es el valor del Euro hoy?",
        "¿A cuánto está el peso argentino?",
        "Necesito saber el valor del Yuan chino",
        "¿Cuánto vale la Libra Esterlina en Chile?"
    ]
    
    # Información que debe estar presente en la respuesta
    expected_content = [
        "solo",
        "uf",
        "dólar"
    ]
    
    for query in unsupported_currency_queries:
        response = client.post("/chatbot", json={"texto": query})
        response_data = response.get_json()
        response_lower = response_data["respuesta"].lower()

        # Verificar código de respuesta
        assert response.status_code == 200, f"La petición falló para: '{query}'"
        
        # Verificar que la respuesta contiene información relevante
        assert all(content in response_lower for content in expected_content), \
               f"La respuesta no indica correctamente las monedas soportadas para: '{query}'\nRespuesta: {response_data['respuesta']}"
        
        # Verificar que se menciona explícitamente la limitación
        assert "solo puedo consultar" in response_lower or "solamente soporto" in response_lower, \
               f"La respuesta no indica claramente las limitaciones: '{response_data['respuesta']}'"
