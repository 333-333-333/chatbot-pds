# Importar la biblioteca requests para realizar solicitudes HTTP
# Importar la biblioteca googletrans para traducción de texto

import requests
from googletrans import Translator
import os
from dotenv import load_dotenv

# Cargar las variables del archivo .env
load_dotenv()

# Configuración de la API de NewsAPI

API_KEY = os.getenv("NEWSAPI_KEY")  # Obtener la clave API desde el archivo .env
CATEGORY = "business"  # Categoría de noticias (business, entertainment, general, health, science, sports, technology)
LANGUAGE = "en"  # Idioma de las noticias 
NUM_NOTICIAS = 5  # Número de noticias a obtener

# Inicializar el traductor
translator = Translator()

def translate_to_spanish(text):
    # Verificar si el texto es None
    if text is None:
        return ""
    
    # Traducir el texto al español
    try:
        translated = translator.translate(text, dest='es')
        return translated.text
    except Exception as e:
        print(f"Error al traducir: {e}")
        return text  # Si no se puede traducir, devolvemos el texto original

def obtener_noticias():
    # URL para obtener noticias de la categoría seleccionada en inglés
    url = f"https://newsapi.org/v2/top-headlines?category={CATEGORY}&language={LANGUAGE}&apiKey={API_KEY}"

    # Imprimir la URL construida para ver cómo queda
    print(f"URL construida: {url}")
    
    try:
        # Realizar la solicitud a la API
        response = requests.get(url)
        data = response.json()
        
        if data["status"] == "ok":
            # Extraer las noticias
            noticias = data["articles"]
            
            if noticias:
                # Traducir y devolver las noticias según el número configurado en NUM_NOTICIAS
                noticias_str = ""
                for noticia in noticias[:NUM_NOTICIAS]:
                    # Traducir solo si el título y descripción no son None
                    titular = translate_to_spanish(noticia.get('title', None))
                    descripcion = translate_to_spanish(noticia.get('description', None))
                    
                    noticias_str += f"Titular: {titular}\nDescripción: {descripcion}\nURL: {noticia['url']}\n\n"
                
                return f"Las {NUM_NOTICIAS} últimas noticias de {CATEGORY}:\n\n{noticias_str}"
            else:
                return f"No se encontraron noticias de {CATEGORY} en este momento."
        else:
            return f"Error al obtener noticias. Mensaje: {data.get('message', 'No disponible')}"
    
    except Exception as e:
        return f"No pude obtener las noticias. Error: {e}"
