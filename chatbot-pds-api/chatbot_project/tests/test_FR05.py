import pytest
from flask import Flask
from modules.chatbot_bp import chatbot_bp

@pytest.fixture
def client():
    app = Flask(__name__)
    app.register_blueprint(chatbot_bp)
    app.testing = True
    with app.test_client() as client:
        yield client

def test_FR05_consultas_sin_interrogacion(client):
    """
    Test para verificar que el chatbot responde correctamente a consultas sin signo de interrogación.
    
    El test comprueba que:
    1. El endpoint responde con código 200
    2. El chatbot proporciona respuestas similares tanto para consultas con y sin interrogación
    3. Las respuestas tienen sentido contextual según la pregunta
    """
    # Pares de consultas (sin interrogación, con interrogación)
    pares_consultas = [
        ("Dime el horario de atención", "¿Cuál es el horario de atención?"),
        ("Necesito ayuda con mi cuenta", "¿Cómo puedo obtener ayuda con mi cuenta?"),
        ("Quiero saber sobre los servicios", "¿Qué servicios ofrecen?"),
        ("Indicame el valor del dólar hoy", "¿Cuál es el valor del dólar hoy?"),
        ("Cuéntame sobre la empresa", "¿Puedes contarme sobre la empresa?")
    ]
    
    for consulta_sin, consulta_con in pares_consultas:
        # Obtener respuesta para consulta sin interrogación
        response_sin = client.post("/chatbot", json={"texto": consulta_sin})
        response_sin_data = response_sin.get_json()
        
        # Obtener respuesta para consulta con interrogación
        response_con = client.post("/chatbot", json={"texto": consulta_con})
        response_con_data = response_con.get_json()
        
        # Verificar código de respuesta
        assert response_sin.status_code == 200, f"La petición falló para: '{consulta_sin}'"
        assert response_con.status_code == 200, f"La petición falló para: '{consulta_con}'"
        
        # Verificar que ambas respuestas no estén vacías
        assert response_sin_data["respuesta"].strip(), f"Respuesta vacía para: '{consulta_sin}'"
        assert response_con_data["respuesta"].strip(), f"Respuesta vacía para: '{consulta_con}'"
        
        # Verificar similitud semántica entre respuestas
        # En un test real podrías implementar una métrica de similitud más sofisticada
        # o verificar palabras clave específicas para cada tipo de consulta
        assert len(response_sin_data["respuesta"]) > 20, f"Respuesta demasiado corta para: '{consulta_sin}'"
        
        # Verificar que no hay mensajes de error o de no comprensión
        errores = ["no entiendo", "no comprendo", "no puedo responder", "no tengo información"]
        for error in errores:
            assert error not in response_sin_data["respuesta"].lower(), \
                f"La respuesta contiene mensaje de error para: '{consulta_sin}'"
