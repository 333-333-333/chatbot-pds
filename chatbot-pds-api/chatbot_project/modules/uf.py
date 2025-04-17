# Importar la biblioteca requests para realizar solicitudes HTTP

import requests

# Función para obtener el valor de la UF
# Esta función realiza una solicitud a la API de mindicador.cl para obtener el valor actual de la UF
# y devuelve una cadena formateada con el valor y la fecha.
# Si ocurre un error durante la solicitud, se captura la excepción y se devuelve un mensaje de error.


def obtener_uf():
    try:
        url = "https://mindicador.cl/api/uf"
        response = requests.get(url)
        data = response.json()
        
        valor = data["serie"][0]["valor"]
        fecha = data["serie"][0]["fecha"][:10]
        
        return f"La UF del {fecha} está en ${valor:,.2f} pesos chilenos."
    
    except Exception as e:
        return f"No pude obtener el valor de la UF. Error: {e}"
