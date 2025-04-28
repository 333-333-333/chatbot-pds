import string
from flask import Blueprint, request, jsonify
import logging
import spacy
import re
from modules.dolar import obtener_dolar
from modules.uf import obtener_uf
from modules.news import obtener_noticias
from modules.weather import obtener_clima

chatbot_bp = Blueprint("chatbot", __name__)
nlp = spacy.load("es_core_news_sm")
nlp_md = spacy.load("es_core_news_md")

@chatbot_bp.route('/bienvenida', methods=['GET'])
def mensaje_bienvenida():
    return jsonify({"respuesta": presentacion_bot()})


def presentacion_bot():
    return(
        " 🤖 Hola, soy un chatbot .\n"
        " 🤖 -Puedo ayurdarte con varias cosas como:\n"
        " 🤖 -Consultar el precio del dolar o de la UF  \n"
        " 🤖 -Consultar el clima de tu ciudad  \n"
        " 🤖 -Mostrarte las últimas noticias  \n"
        " 🤖 Solo pregúntame lo que necesites y estaré encantado de ayudarte.  \n"
    )


@chatbot_bp.route("/chatbot", methods=['POST'])
def handle_chat():
    data = request.get_json()
    user_input = data.get("texto", "")
    response = chatbot_response(user_input)
    return jsonify({"respuesta": response})


intenciones = {
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
            "triggers": ["uf", "precio de la uf", "valor de la uf"],
            "respuesta": obtener_uf
        },
        "noticias": {
            "triggers": ["noticias", "ultimas noticias", "novedades", "diario", "noticiero"],
            "respuesta": None
        },
        "clima": {
            "triggers": ["clima", "tiempo", "pronóstico del tiempo", "estado del tiempo"],
            "respuesta": None
        }
    }

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

def chatbot_response(text) -> dict:
    text = _simplificar_texto(text)
    logging.info(f"[🧪 Texto recibido]: {text}")

    for nombre_intencion, intencion in intenciones.items():
        logging.info(f"🔍 Probando intención: {nombre_intencion}")

        for trigger in intencion["triggers"]:
            pattern = r'\b' + re.escape(trigger) + r'\b'
            logging.info(f"   👉 ¿regex '{pattern}' en '{text}'?")
            if re.search(pattern, text):
                logging.info(f"✅ Coincidencia con: {trigger}")

                # Si detectamos "noticias", miramos si también dice un país
                if nombre_intencion == "noticias":

                    # Buscar si el texto contiene alguno de los países
                    for nombre_pais, codigo_pais in paises.items():
                        if nombre_pais in text:
                            return obtener_noticias(codigo_pais)

                    # Si no detecta país específico, devuelve noticias de EEUU
                    return obtener_noticias()

                if nombre_intencion == "clima":
                    lugar = _extraer_lugar(text)
                    logging.info(f"Lugar extraído de la petición de clima: {lugar}")
                    return obtener_clima(lugar)

                # Resto de las respuestas normales
                respuesta = intencion["respuesta"]
                return respuesta() if callable(respuesta) else respuesta

    return fallback_response(text)


reemplazos = {
    "á": "a",
    "é": "e",
    "í": "i",
    "ó": "o",
    "ú": "u",
    "ü": "u"
}


def _simplificar_texto(texto: str) -> str:
    resultado = _quitar_puntuacion(texto)
    resultado = resultado.lower()

    for original, reemplazo in reemplazos.items():
        resultado = resultado.replace(original, reemplazo)
    
    return resultado


def _quitar_puntuacion(texto: str) -> str:
    return re.sub(rf"[{re.escape(string.punctuation)}¿¡«»]", "", texto)


def _extraer_lugar(texto: str) -> str:
    doc = nlp_md(texto)
    lugar = "temuco (default)"

    for ent in doc.ents:
        if ent.label_ in ("LOC", "GPE"):
            lugar = ent.text
            break
    
    return lugar.strip()


def fallback_response(text):
    doc = nlp(text)
    sustantivos = [token.text for token in doc if token.pos_ == "NOUN"]

    mensaje = (
        "Lo siento, aún no puedo ayudarte con eso 🤔.\n"
        "¿Podrías reformular tu pregunta? 🥺\n"
    )

    if sustantivos:
        mensaje += f"• He notado que mencionas: {', '.join(sustantivos)} 🔎\n"

    mensaje += (
        "📚 Actualmente puedo ayudarte con lo siguiente:\n"
        "• Valor del dólar\n"
        "• Valor de la UF\n"
        "• El clima de tu ciudad\n"
        "• Noticias financieras recientes\n"
    )

    return mensaje
