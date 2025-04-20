from flask import Flask, request, jsonify
import logging
import spacy
import re
from modules.dolar import obtener_dolar
from modules.uf import obtener_uf
from modules.news import obtener_noticias
from modules.weather import obtener_clima

app = Flask(__name__)
nlp = spacy.load("es_core_news_sm")

def presentacion_bot():
    return(
        " 🤖 Hola, soy un chatbot .\n"
        " 🤖 -Puedo ayurdarte con varias cosas como:\n"
        " 🤖 -Consultar el precio del dolar o de la UF  \n"
        " 🤖 -Consultar el clima de tu ciudad  \n"
        " 🤖 -Mostrarte las últimas noticias  \n"
        " 🤖 Solo pregúntame lo que necesites y estaré encantado de ayudarte.  \n"
    )
intenciones={
        "saludo": {
            "triggers": ["hola","ola", "buenas", "hey", "holi","hi","hello"],
            "respuesta": lambda: presentacion_bot()
        },
        "despedida": {
            "triggers": ["adios", "bye", "chao","nos vemos"],
            "respuesta": lambda: "adiós, ¡que tengas un buen día!"
        },
        "agradecimiento": {
            "triggers": ["gracias", "gracias por ayudarme", "gracias por tu ayuda", "tenkiu", "thanks you"],
            "respuesta": lambda: "¡De nada! Estoy aquí para ayudarte"
        },
        "como estás": {
            "triggers": ["como estas", "como te encuentras", "como va todo", "que tal"],
            "respuesta": lambda: "estoy bien, gracias por preguntar."
        },
        "dolar": {
            "triggers": ["dolar", "precio del dolar", "valor del dolar", "dólar", "usd"],
            "respuesta": obtener_dolar
        },
        "uf": {
            "triggers": ["uf", "precio de la uf", "valor de la uf","UF"],
            "respuesta": obtener_uf
        },
        "noticias": {
            "triggers": ["noticias", "últimas noticias", "novedades","diario","noticiero"],
            "respuesta": obtener_noticias
        },
        "clima": {
            "triggers": ["clima", "tiempo", "pronóstico del tiempo", "estado del tiempo"],
            "respuesta": obtener_clima
        }
    }

def chatbot_response(text):
    text = text.lower()
    logging.info(f"[🧪 Texto recibido]: {text}")

    for nombre_intencion, intencion in intenciones.items():
        logging.info(f"🔍 Probando intención: {nombre_intencion}")
        for trigger in intencion["triggers"]:
            pattern = r'\b' + re.escape(trigger) + r'\b'
            logging.info(f"   👉 ¿regex '{pattern}' en '{text}'?")
            if re.search(pattern, text):
                logging.info(f"✅ Coincidencia con: {trigger}")
                respuesta = intencion["respuesta"]
                return respuesta() if callable(respuesta) else respuesta

    return "Lo siento, no entiendo tu pregunta. ¿Puedes reformularla? 🥺"

@app.route('/bienvenida', methods=['GET'])
def mensaje_bienvenida():
    return jsonify({"respuesta": presentacion_bot()})


@app.route('/chatbot', methods=['POST'])
def handle_chat():
    data = request.get_json()
    user_input = data.get("texto", "")
    response = chatbot_response(user_input)
    return jsonify({"respuesta": response})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
