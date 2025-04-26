import pytest
from unittest.mock import patch, MagicMock
import re
from chatbot_api import chatbot_response, obtener_dolar, intenciones

@pytest.fixture
def mock_dolar_response():
    """Fixture that provides a simulated response for the dollar value."""
    return "El dólar del 2023-11-15 está en $850 pesos chilenos."

class TestChatbotAPI:
    """Tests for chatbot API functionalities."""
    
    def test_texto_ambiguo_solicita_aclaracion(self):
        """
        Verifies that the chatbot requests clarification with good writing
        when receiving ambiguous text.
        """
        # Examples of ambiguous texts
        textos_ambiguos = [
            "dame información",
            "quiero saber valores",
            "dime algo interesante",
            "necesito datos actuales"
        ]
        
        frases_aclaracion = ["no entiendo", "no logro entender", 
                           "no te comprendo", "podrías aclarar"]
        opciones_sugeridas = ["dólar", "clima", "noticia", "uf", 
                            "consultar", "preguntar"]
        
        for texto in textos_ambiguos:
            respuesta = chatbot_response(texto)
            respuesta_lower = str(respuesta).lower()
            
            # The response must contain a friendly clarification message
            assert any(frase in respuesta_lower for frase in frases_aclaracion), \
                   f"No se solicitó aclaración para: '{texto}'"
            
            # The response must offer specific options or clear guidance
            assert any(opcion in respuesta_lower for opcion in opciones_sugeridas), \
                   f"No se ofrecieron opciones claras para: '{texto}'"

    def test_deteccion_triggers_dolar(self):
        """
        Verifies that triggers for the 'dolar' intent are properly configured
        and detect common variants.
        """
        # Check that the "dolar" intent exists and has triggers
        assert "dolar" in intenciones, "La intención 'dolar' no está definida"
        assert "triggers" in intenciones["dolar"], "La intención 'dolar' no tiene triggers definidos"
        
        # Common variants to refer to the dollar
        variantes_dolar = ["dolar", "dólar", "usd"]
        
        # Check that at least some common variants are covered
        triggers_dolar = intenciones["dolar"]["triggers"]
        
        for variante in variantes_dolar:
            assert any(variante in trigger.lower() for trigger in triggers_dolar), \
                   f"La variante '{variante}' no está cubierta en los triggers del dólar"
