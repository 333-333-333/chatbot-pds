from flask import Flask
import pytest
from modules.chatbot_bp import chatbot_bp

"""Pruebas para el Requisito Funcional 08: Manejo de texto ambiguo."""
@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(chatbot_bp)
    app.testing = True
    with app.test_client() as client:
        yield client


def test(client):
    """
    Verifica que el chatbot solicite aclaración con buena redacción
    cuando recibe texto ambiguo.
    """
    # Ejemplos de textos ambiguos
    ambiguous_texts = [
        "no funcx1iona",
        "asfnalkf",
        "dime algo interesante",
        "necesito datos actuales"
    ]
    
    clarification_phrases = ["no entiendo", "no logro entender", 
                        "no te comprendo", "podrías aclarar", "no puedo"]
    
    for text in ambiguous_texts:
        response = client.post("/chatbot", json={"texto": text})
        response_lower = response.get_json()["respuesta"].lower()

        assert response.status_code == 200
        
        # La respuesta debe contener un mensaje de aclaración amigable
        assert any(phrase in response_lower for phrase in clarification_phrases), \
                f"No se solicitó aclaración para: '{text}'"
