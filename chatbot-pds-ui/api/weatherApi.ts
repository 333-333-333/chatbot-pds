import { Location, LocationCoordinates } from "@/interfaces";

const API_URL = process.env.EXPO_PUBLIC_WEATHER_API_URL;
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

export class WeatherApi {
    public async fetchWeather(location: LocationCoordinates): Promise<any> {
        const url = `${API_URL}/weather?appid=${API_KEY}&lat=${location.latitude}&lon=${location.longitude}&units=metric`
        const response = await fetch(url)
    
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.body}`)
        }
    
        return await response.json()
    }
}
