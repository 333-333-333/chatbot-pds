# Importar la biblioteca spaCy para procesamiento de lenguaje natural

import spacy

# Importar las funciones de los módulos correspondientes

from modules.dolar import obtener_dolar
from modules.uf import obtener_uf
from modules.news import obtener_noticias
from modules.weather import obtener_clima  

# Cargar el modelo en español de spaCy
nlp = spacy.load("es_core_news_sm")

def presentacion_bot():
    return(
        " 🤖 Hola, soy un chatbot .\n"
        " 🤖 Puedo ayurdarte con varias cosas como:\n"
        " 🤖 -Consultar el precio del dolar o de la UF  \n"
        " 🤖 -Consultar el clima de tu ciudad  \n"
        " 🤖 -Mostrarte las últimas noticias  \n"
        " 🤖 Solo pregúntame lo que necesites y estaré encantado de ayudarte.  \n"
    )

def chatbot_response(text):
    text = text.lower()

    if any(saludo in text for saludo in ["hola", "buenas", "hey", "holi"]):
        return presentacion_bot()

    responses = {
        "hola": "hola, ¿cómo estás?",
        "adios": "adiós, ¡que tengas un buen día!",
        "cómo estás": "estoy bien, gracias por preguntar.",
        "dólar": obtener_dolar,
        "uf": obtener_uf,
        "clima": obtener_clima,
    }

    # Si detectamos "noticias", miramos si también dice un país
    if "noticias" in text:
        # Mapear nombres de países a códigos ISO
        paises = {
            "chile": "cl",
            "argentina": "ar",
            "mexico": "mx",
            "colombia": "co",
            "españa": "es",
            "eeuu": "us",
            "estados unidos": "us",
            "brasil": "br",
        }

        # Buscar si el texto contiene alguno de los países
        for nombre_pais, codigo_pais in paises.items():
            if nombre_pais in text:
                return obtener_noticias(codigo_pais)
        
        # Si no detecta país específico, devuelve noticias de EEUU
        return obtener_noticias()

    # Resto de las respuestas normales
    for key, value in responses.items():
        if key in text:
            return value() if callable(value) else value

    return "Lo siento, no entiendo tu pregunta. ¿Puedes reformularla?"


# Interacción con el usuario
# Se inicia un bucle que permite al usuario interactuar con el chatbot
# hasta que escriba "adiós".
print("¡Hola! Soy tu chatbot. Escribe 'adiós' para salir.")
while True:
    user_input = input("Tú: ")
    response = chatbot_response(user_input)
    print(f"Chatbot: {response}")
    if "adiós" in user_input.lower():
        print("Chatbot: ¡Adiós! ¡Que tengas un buen día!")
        break