from flask import Flask, request, jsonify
import spacy
from modules.dolar import obtener_dolar
from modules.uf import obtener_uf
from modules.news import obtener_noticias
from modules.weather import obtener_clima

app = Flask(__name__)
nlp = spacy.load("es_core_news_sm")

def chatbot_response(text):
    text = text.lower()
    responses = {
        "hola": "hola, ¿cómo estás?",
        "adios": "adiós, ¡que tengas un buen día!",
        "como estas": "estoy bien, gracias por preguntar.",
        "dólar": obtener_dolar,
        "uf": obtener_uf,
        "noticias": obtener_noticias,
        "clima": obtener_clima,
    }
    for key, value in responses.items():
        if key in text:
            return value() if callable(value) else value
    return "Lo siento, no entiendo tu pregunta. ¿Puedes reformularla?"

@app.route('/chatbot', methods=['POST'])
def handle_chat():
    data = request.get_json()
    user_input = data.get("texto", "")
    response = chatbot_response(user_input)
    return jsonify({"respuesta": response})

if __name__ == '__main__':
    app.run()
