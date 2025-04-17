import { Location } from "@/interfaces"

export type Condition = "clear_sky" | "few_clouds" | "clouds" | "drizzle" | "rain" | "thunderstorm" | "snow" | "mist" | "unknown"

export type TimeOfDay = "day" | "night"

export interface WeatherData {
    condition: Condition
    timeOfDay: TimeOfDay
    temperatureCelsius: number
    temperatureFahrenheit: number
    humidity: number
}

export interface LocalizedWeather extends WeatherData {
    location: Location
}
