# Importar la biblioteca spaCy para procesamiento de lenguaje natural

import spacy

# Importar las funciones de los módulos correspondientes

from modules.dolar import obtener_dolar
from modules.uf import obtener_uf
from modules.news import obtener_noticias
from modules.weather import obtener_clima  

# Cargar el modelo en español de spaCy
nlp = spacy.load("es_core_news_sm")

# Función principal del chatbot
# Esta función recibe un texto y devuelve una respuesta basada en el contenido del texto
# y en las funciones de los módulos importados.
# Se han añadido comentarios para explicar cada parte del código.

def chatbot_response(text):
    text= text.lower()  # Convertir el texto a minúsculas para facilitar la comparación
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