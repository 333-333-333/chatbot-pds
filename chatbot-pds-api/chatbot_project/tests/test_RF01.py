import pytest
from unittest.mock import patch, MagicMock
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from chatbot_api import chatbot_response

class TestRF01:
    """Pruebas para el Requisito Funcional 01: Manejo de texto ambiguo."""
    
    def test_ambiguous_text_requests_clarification(self):
        """
        Verifica que el chatbot solicite aclaración con buena redacción
        cuando recibe texto ambiguo.
        """
        # Ejemplos de textos ambiguos
        ambiguous_texts = [
            "asfnalkf",
            "dime algo interesante",
            "necesito datos actuales"
        ]
        
        clarification_phrases = ["no entiendo", "no logro entender", 
                           "no te comprendo", "podrías aclarar"]
        
        for text in ambiguous_texts:
            response = chatbot_response(text)
            response_lower = str(response).lower()
            
            # La respuesta debe contener un mensaje de aclaración amigable
            assert any(phrase in response_lower for phrase in clarification_phrases), \
                   f"No se solicitó aclaración para: '{text}'"
