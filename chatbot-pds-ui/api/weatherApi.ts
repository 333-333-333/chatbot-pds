/**
 * Weather API - Client for fetching weather data
 *
 * This class provides methods to retrieve current weather conditions
 * based on geographic coordinates (latitude and longitude).
 * It handles API requests, responses, and error management.
 */

import { LocationCoordinates } from "@/interfaces";

/**
 * Base URL for the weather API from environment variables
 */
const API_URL = process.env.EXPO_PUBLIC_WEATHER_API_URL;

/**
 * Authentication key for the weather API from environment variables
 */
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

/**
 * Weather API service class
 *
 * Provides functionality to interact with the weather service and fetch
 * current weather conditions based on geographic coordinates.
 */
export class WeatherApi {
  /**
   * Fetches current weather data for a specific location
   *
   * @param location - Geographic coordinates containing latitude and longitude
   * @returns A promise that resolves to the weather data from the API
   * @throws Error if the API request fails or if credentials are invalid
   *
   * @example
   * ```typescript
   * const weatherApi = new WeatherApi();
   * const coordinates = { latitude: 40.712776, longitude: -74.005974 };
   *
   * try {
   *   const weatherData = await weatherApi.fetchWeather(coordinates);
   *   console.log(`Current temperature: ${weatherData.main.temp}°C`);
   * } catch (error) {
   *   console.error('Error fetching weather data:', error);
   * }
   * ```
   */
  public async fetchWeather(location: LocationCoordinates): Promise<any> {
    try {
      if (!API_URL || !API_KEY) {
        throw new Error("API URL or API Key is not defined");
      }

      const url = `${API_URL}/weather?appid=${API_KEY}&lat=${location.latitude}&lon=${location.longitude}&units=metric`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.body}`);
      }

      return await response.json();
    } catch (error: any) {
      throw new Error("fetchingailed to fetch weather data");
    }
  }
}
