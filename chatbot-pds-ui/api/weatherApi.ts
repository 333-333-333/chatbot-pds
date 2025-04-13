const API_URL = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_MAP_API_KEY;

export type Condition = "clear_sky" | "few_clouds" | "clouds" | "drizzle" | "rain" | "thunderstorm" | "snow" | "mist" | "unknown"

export type TimeOfDay = "day" | "night"

export interface WeatherData {
    condition: Condition
    timeOfDay: TimeOfDay
    temperatureC: number
    humidity: number
}

export const fetchWeather = async (location: string): Promise<WeatherData> => {
    const url = `${API_URL}?appid=${API_KEY}&q=${encodeURIComponent(location)}&units=metric`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.body}`)
    }

    const data = await response.json()

    return {
        condition: parseCondition(data.weather),
        timeOfDay: parseTimeOfDay(data.sys),
        temperatureC: data.main.temp,
        humidity: data.main.humidity,
    }
}

const parseTimeOfDay = (sys: any): TimeOfDay => {
    const sunrise: number = sys.sunrise
    const sunset: number = sys.sunset
    const now = Math.floor(Date.now() / 1000)

    return now >= sunrise && now < sunset ? "day" : "night"
}

const parseCondition = (weather: any): Condition => {
    const main: string = weather[0].main
    const description: string = weather[0].description

    switch (main) {
        case "Clear":
            return "clear_sky"
        case "Clouds":
            if (description.includes("few clouds")) {
                return "few_clouds"
            }

            return "clouds"
        case "Drizzle":
            return "drizzle"
        case "Rain":
            return "rain"
        case "Thunderstorm":
            return "thunderstorm"
        case "Snow":
            return "snow"
        case "Mist":
            return "mist"
        default:
            return "unknown"
    }
}
