import { WeatherApi } from "@/api/weatherApi";
import {
  Condition,
  LocationCoordinates,
  TimeOfDay,
  WeatherData,
} from "@/interfaces";

export class WeatherRepository {
  private weatherApi: WeatherApi;

  /**
   * Create a new instance of a WeatherRepository.
   */
  constructor() {
    this.weatherApi = new WeatherApi();
  }

  async getCurrentWeather(
    location: LocationCoordinates,
  ): Promise<WeatherData | null> {
    const response = await this.weatherApi.fetchWeather(location);

    if (!response) {
      console.warn("Current weather data could not be properly fetched");
      return null;
    }

    const temperatureCelsius = response.main.temp;

    return {
      condition: this.parseCondition(response.weather),
      timeOfDay: this.parseTimeOfDay(response.sys),
      temperatureCelsius,
      temperatureFahrenheit: (temperatureCelsius * 9) / 5 + 32,
      humidity: response.main.humidity,
    };
  }

  private parseTimeOfDay = (sys: any): TimeOfDay => {
    const sunrise: number = sys.sunrise;
    const sunset: number = sys.sunset;
    const now = Math.floor(Date.now() / 1000);

    return now >= sunrise && now < sunset ? "day" : "night";
  };

  private parseCondition = (weather: any): Condition => {
    const main: string = weather[0].main;
    const description: string = weather[0].description;

    switch (main) {
      case "Clear":
        return "clear_sky";
      case "Clouds":
        if (description.includes("few clouds")) {
          return "few_clouds";
        }

        return "clouds";
      case "Drizzle":
        return "drizzle";
      case "Rain":
        return "rain";
      case "Thunderstorm":
        return "thunderstorm";
      case "Snow":
        return "snow";
      case "Mist":
        return "mist";
      default:
        return "unknown";
    }
  };
}
