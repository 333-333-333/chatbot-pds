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
    text= text.lower() 
    if any(saludo in text for saludo in ["hola", "buenas", "hey", "holi"]):
        return presentacion_bot() 
    responses={
        "hola":"hola, ¿cómo estás?",
        "adios":"adiós, ¡que tengas un buen día!",
        "como estas":"estoy bien, gracias por preguntar.",
        "dólar": obtener_dolar,
        "uf": obtener_uf,
        "noticias": obtener_noticias,
        "clima": obtener_clima,
    }
    for key,value in responses.items():
        if key in text:
            return value() if callable(value) else value
        
    return fallback_response(text)

def fallback_response(text):
    doc = nlp(text)
    sustantivos = [token.text for token in doc if token.pos_ == "NOUN"]

    mensaje = (
        "Lo siento, aún no puedo ayudarte con eso 🤔.\n"
        "¿Podrías reformular tu pregunta? 🥺\n"
    )

    if sustantivos:
        mensaje += f"He notado que mencionas: {', '.join(sustantivos)} 🔎\n"

    mensaje += (
        "📚 Actualmente puedo ayudarte con lo siguiente:\n"
        "• Valor del dólar\n"
        "• Valor de la UF\n"
        "• El clima de tu ciudad\n"
        "• Noticias financieras recientes\n"
    )

    return mensaje

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