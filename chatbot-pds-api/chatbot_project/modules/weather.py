import logging
import random
import requests
import os
import time

from dataclasses import dataclass
from typing import Literal
from urllib.parse import quote
from dotenv import load_dotenv

load_dotenv()
_API_KEY = os.getenv("WEATHER_API_KEY")
_TIPO = "clima"
_RESPUESTAS_POSITIVAS = [
    "¡Por supuesto! Aquí tienes el clima en {}.",
    "Claro, a continuación tienes el clima actual en {}.",
    "Aquí está el pronóstico para {}.",
    "¡Con gusto! Este es el clima en {}.",
    "Esto es lo que encontré sobre el clima en {}:",
    "Aquí tienes el estado del clima en {}."
]
_RESPUESTAS_NEGATIVAS = [
    "Lo siento, no pude obtener el clima para {}.",
    "No encontré información del tiempo en {}. ¿Podrías verificar el nombre?",
    "No pude obtener el clima de {}. ¿Quieres probar con otro lugar?",
    "Disculpa, no pude localizar el pronóstico para {}.",
    "Parece que {} no está en mi base de datos de clima.",
    "No tengo información actualizada del clima en {}."
]

Condition = Literal[
    "clear_sky",
    "few_clouds",
    "clouds",
    "drizzle",
    "rain",
    "thunderstorm",
    "snow",
    "mist",
    "unknown"
]

TimeOfDay = Literal["day", "night"]

@dataclass
class Location:
    city: str
    countryCode: str

@dataclass
class LocalizedWeather:
    condition: Condition
    timeOfDay: TimeOfDay
    temperatureCelsius: float
    temperatureFahrenheit: float
    humidity: int
    location: Location

def obtener_clima(lugar: str) -> dict:    
    es_lugar_desconocido = lugar == "temuco (default)"

    if es_lugar_desconocido:
        lugar = "temuco"
    
    lugar = lugar.title()
    url = f"https://api.openweathermap.org/data/2.5/weather?appid={_API_KEY}&q={quote(lugar)}&units=metric"

    try:
        response = requests.get(url)
        data = response.json()
        
        if data["cod"] == 200:
            mensaje = "No entendí el lugar que proporcionaste, pero te dejo el clima en Temuco." if es_lugar_desconocido else random.choice(_RESPUESTAS_POSITIVAS)
            temperatureCelsius = data["main"]["temp"]
            lugar = data["name"]

            datos = LocalizedWeather(
                condition=_parse_condition(data["weather"]),
                timeOfDay=_parse_time_of_day(data["sys"]),
                temperatureCelsius=temperatureCelsius,
                temperatureFahrenheit=(temperatureCelsius * 9) / 5 + 32,
                humidity=data["main"]["humidity"],
                location=Location(city=lugar, countryCode=data["sys"]["country"])
            )

            return {
                "tipo": _TIPO,
                "mensaje": mensaje.format(lugar),
                "datos": datos
            }
        else:
            logging.error(f"Error: {data.get('message', 'Desconocido')}")
            return {
                "tipo": _TIPO,
                "mensaje": random.choice(_RESPUESTAS_NEGATIVAS).format(lugar),
                "datos": {}
            }
    
    except Exception as e:
        logging.error(f"Error: {e}")
        return {
            "tipo": _TIPO,
            "mensaje": random.choice(_RESPUESTAS_NEGATIVAS).format(lugar),
            "datos": {}
        }


def _parse_condition(weather: list[dict]) -> Condition:
    main = weather[0]["main"]
    description = weather[0]["description"]

    if main == "Clear":
        return "clear_sky"
    elif main == "Clouds":
        if "few clouds" in description:
            return "few_clouds"
        return "clouds"
    elif main == "Drizzle":
        return "drizzle"
    elif main == "Rain":
        return "rain"
    elif main == "Thunderstorm":
        return "thunderstorm"
    elif main == "Snow":
        return "snow"
    elif main == "Mist":
        return "mist"
    else:
        return "unknown"

def _parse_time_of_day(sys: dict) -> TimeOfDay:
    sunrise = sys["sunrise"]
    sunset = sys["sunset"]
    now = int(time.time())

    return "day" if sunrise <= now < sunset else "night"
