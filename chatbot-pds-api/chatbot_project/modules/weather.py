# Importar la biblioteca requests para realizar solicitudes HTTP
import requests

# Importar os y dotenv para manejar variables de entorno
import os
from dotenv import load_dotenv

# Cargar variables del archivo .env
load_dotenv()

# Función para obtener el clima de Santiago
def obtener_clima():
    
    # Configuración de la API de OpenWeatherMap
    
    API_KEY = os.getenv("OPENWEATHER_API_KEY")  # Obtener la clave API desde el archivo .env
    ciudad = "Santiago"     # Ciudad por defecto (Santiago)
    url = f"http://api.openweathermap.org/data/2.5/weather?q={ciudad}&appid={API_KEY}&units=metric&lang=es" # URL para obtener el clima de la ciudad especificada en español y en grados Celsius

    try:
        # Realizar la solicitud a la API
        response = requests.get(url)
        data = response.json()
        
        # Verificar si la respuesta es exitosa (código 200)
        # y extraer la información del clima
        # Si la ciudad no es válida, se devuelve un mensaje de error
        # Si la ciudad es válida, se extraen los datos de temperatura, descripción y humedad
        # y se devuelve un mensaje formateado con la información del clima
        
        if data["cod"] == 200:
            temperatura = data["main"]["temp"]
            descripcion = data["weather"][0]["description"]
            humedad = data["main"]["humidity"]
            return f"El clima en {ciudad} es {descripcion} con una temperatura de {temperatura}°C y humedad del {humedad}%."
        else:
            return f"No pude obtener el clima de {ciudad}. Error: {data.get('message', 'Desconocido')}"
    
    except Exception as e:
        return f"No pude obtener el clima. Error: {e}"
