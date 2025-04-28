import random
import requests
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# API Key y URL de NewsData.io
API_KEY = os.getenv("NEWS_API_KEY")
API_URL = "https://newsdata.io/api/1/latest"

_RESPUESTAS_POSITIVAS = [
    "¡Por supuesto! Aquí tienes las noticias de {}.",
    "Claro, a continuación tienes las noticias más recientes de {}.",
    "Aquí están las últimas noticias sobre {}.",
    "¡Con gusto! Estas son las noticias actuales de {}.",
    "Esto es lo que encontré sobre las noticias en {}:",
    "Aquí tienes un resumen de las noticias en {}."
]
_RESPUESTAS_NEGATIVAS = [
    "Lo siento, no pude obtener noticias de {}.",
    "No encontré información de noticias en {}. ¿Podrías verificar el nombre?",
    "No pude obtener noticias de {}. ¿Quieres probar con otro país?",
    "Disculpa, no pude localizar noticias recientes para {}.",
    "Parece que {} no está en mi base de datos de noticias.",
    "No tengo información actualizada de noticias en {}."
]

def obtener_noticias(country_name="estados unidos", country_code="us"):
    """
    Obtiene las últimas noticias financieras (business) usando NewsData.io.
    """
    num_noticias = 5

    params = {
        'apikey': API_KEY,      # OJO: NewsData.io usa 'apikey' como nombre
        'country': country_code,
        'category': 'business',
        'language': 'es',       # Opcional: podrías agregar language='es' para noticias en español si quieres
    }

    try:
        response = requests.get(API_URL, params=params, headers={"Accept": "application/json"})
        data = response.json()

        if data.get("status") == "success":
            noticias = data.get("results", [])
            if not noticias:
                return "No se encontraron noticias financieras en este momento."

            datos = []

            for noticia in noticias[:num_noticias]:
                titulo = noticia.get('title', 'Sin título')
                descripcion = noticia.get('description', 'Sin descripción')
                url = noticia.get('link', 'Sin enlace')
                image_uri = noticia.get('image_url', 'Sin imagen')

                datos.append({
                    "title": titulo,
                    "description": descripcion,
                    "url": url,
                    "image_uri": image_uri
                })

            mensaje = random.choice(_RESPUESTAS_POSITIVAS)

            return {
                "tipo": "noticias",
                "mensaje": mensaje.format(country_name.title()),
                "datos": datos
            }
        else:
            return {
            "tipo": "error",
            "mensaje": random.choice(_RESPUESTAS_NEGATIVAS).format(country_name),
            "datos": {}
            }
    except Exception:
        return {
            "tipo": "error",
            "mensaje": random.choice(_RESPUESTAS_NEGATIVAS).format(country_name),
            "datos": {}
        }
