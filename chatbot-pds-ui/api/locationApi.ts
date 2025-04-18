/**
 * Location API - Client for fetching location information based on geographic coordinates
 *
 * This class provides methods to retrieve location details using a remote API service.
 * It handles API requests, responses, and error management.
 */

/**
 * API URL for the location service defined in environment variables
 */
const API_URL = process.env.EXPO_PUBLIC_LOCATION_API_URL;

/**
 * Service class for retrieving location information based on geographic coordinates
 *
 * This class provides functionality to convert coordinates (longitude, latitude)
 * into location details using a remote API service.
 */
export class LocationApi {
  /**
   * Fetches location information based on geographic coordinates
   *
   * @param longitude - The longitude coordinate (decimal degrees)
   * @param latitude - The latitude coordinate (decimal degrees)
   * @returns A Promise that resolves to location data containing address and region information
   * @throws Error when the API URL is not configured or when the API request fails
   *
   * @example
   * ```typescript
   * const locationApi = new LocationApi();
   *
   * try {
   *   const locationData = await locationApi.getLocation(-73.985428, 40.748817);
   *   console.log('Location:', locationData.display_name);
   * } catch (error) {
   *   console.error('Failed to get location information:', error);
   * }
   * ```
   */
  public async getLocation(longitude: number, latitude: number): Promise<any> {
    try {
      if (!API_URL) {
        throw new Error("API URL is not defined");
      }
      const url = `${API_URL}?format=json&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url, {
        headers: {
          "User-Agent": "chatbot-pds/1.0",
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching location:", error);
      throw new Error("Failed to fetch location");
    }
  }
}
