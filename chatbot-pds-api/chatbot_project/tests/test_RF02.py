import pytest
from unittest.mock import patch, MagicMock
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from chatbot_api import chatbot_response

class TestRF02:
    """Pruebas para el Requisito Funcional 02: Respuestas específicas a consultas comunes."""
    
    @patch('modules.dolar.obtener_dolar')
    def test_dollar_query_response(self, mock_obtener_dolar):
        """
        Verifica que el chatbot responda correctamente a consultas sobre el valor del dólar.
        """
        # Configurar el mock para retornar un valor predefinido
        mock_obtener_dolar.return_value = "El valor actual del dolar es $850.45 pesos chilenos."
        
        # Variantes de consultas sobre el dólar
        dollar_queries = [
            "dime el precio del dólar",
            "dólar a peso chileno",
            "tipo de cambio dolar"
        ]
        
        expected_content = ["dólar", "pesos", "chilenos", "está"]
        
        for query in dollar_queries:
            response = chatbot_response(query)
            response_lower = str(response).lower()
            print(response_lower)
            
            # Verificar que la respuesta contenga información relevante
            assert all(content in response_lower for content in expected_content), \
                   f"La respuesta no contiene la información esperada para: '{query}'"
