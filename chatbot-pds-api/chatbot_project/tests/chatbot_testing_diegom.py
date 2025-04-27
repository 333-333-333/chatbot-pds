import requests
import pytest

BASE_URL = "https://chatbot-pds.duckdns.org/chatbot"
HEADERS = {
    "Content-Type": "application/json"
}

pruebas = [
    ("¿Cuál es el valor del dólar hoy?", "dólar"),
    ("UF", "UF"),
    ("actualízame el dashboard", ""),
    ("noticias del dólar", "noticias"),
    ("dolar", "dólar"),
    ("no funcx1iona", "no entiendo"),
    ("cuéntame un chiste", "no entiendo"),
    ("¿Cuánto está el euro hoy?", "euro"),
    ("valor del dólar", "dólar"),
    ("uf", "UF")
]

@pytest.mark.parametrize("texto_enviado, keyword_esperada", pruebas)
def test_chatbot_respuestas(texto_enviado, keyword_esperada):
    payload = {"texto": texto_enviado}
    response = requests.post(BASE_URL, json=payload, headers=HEADERS)

    assert response.status_code == 200, f"Status code esperado 200 pero recibió {response.status_code}"

    json_data = response.json()
    assert "respuesta" in json_data, "La respuesta JSON no contiene el campo 'respuesta'"

    respuesta = json_data["respuesta"].lower()
    assert respuesta.strip() != "", "El campo 'respuesta' está vacío"

    if keyword_esperada:
        assert keyword_esperada.lower() in respuesta, f"La respuesta no menciona '{keyword_esperada}'"

if __name__ == "__main__":
    pytest.main()


