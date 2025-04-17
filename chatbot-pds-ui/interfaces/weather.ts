import { Location } from "@/interfaces";

export type Condition =
  | "clear_sky"
  | "few_clouds"
  | "clouds"
  | "drizzle"
  | "rain"
  | "thunderstorm"
  | "snow"
  | "mist"
  | "unknown";

export type TimeOfDay = "day" | "night";

export interface Weather {
  condition: Condition;
  timeOfDay: TimeOfDay;
  temperatureCelsius: number;
  temperatureFahrenheit: number;
  humidity: number;
}

export interface LocalizedWeather extends Weather {
  location: Location;
}
