import requests
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# API Key y URL de NewsData.io
API_KEY = os.getenv("NEWS_API_KEY")
API_URL = "https://newsdata.io/api/1/latest"

def obtener_noticias(country_code="us"):
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

            noticias_str = ""
            for noticia in noticias[:num_noticias]:
                titulo = noticia.get('title', 'Sin título')
                descripcion = noticia.get('description', 'Sin descripción')
                url = noticia.get('link', 'Sin enlace')

                noticias_str += f"Titular: {titulo}\nDescripción: {descripcion}\nURL: {url}\n\n"

            return f"Las últimas noticias financieras de {country_code.upper()}:\n\n{noticias_str}"
        else:
            return f"Error al obtener noticias. Mensaje: {data.get('message', 'No disponible')}"
    except Exception as e:
        return f"No pude obtener las noticias. Error: {e}"
