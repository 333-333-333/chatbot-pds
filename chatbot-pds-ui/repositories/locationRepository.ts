import { Location, LocationCoordinates } from "@/interfaces";
import * as ExpoLocation from "expo-location";
import { LocationApi } from "@/api";

/**
 * Repository class responsible for handling location-related operations.
 * Provides methods to get the user's current location information including city and country code.
 */
export class LocationRepository {
  /**
   * The API service for location data retrieval.
   * @private
   */
  private locationApi: LocationApi;

  /**
   * Initializes a new instance of the LocationRepository class.
   * Creates an instance of LocationApi for retrieving location data.
   */
  constructor() {
    this.locationApi = new LocationApi();
  }

  /**
   * Gets the user's current device coordinates.
   * @returns {Promise<LocationCoordinates | null>} A promise that resolves to an object containing latitude and longitude,
   * or null if permission is denied or an error occurs.
   */
  public async getCoordinates(): Promise<LocationCoordinates | null> {
    try {
      const { status } = await ExpoLocation.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Permission to access location was denied");
      }

      const location = await ExpoLocation.getCurrentPositionAsync({});

      if (!location) {
        console.error("Location not found");
        throw new Error("Location not found");
      }

      const coords: LocationCoordinates = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      return coords as LocationCoordinates;
    } catch (error) {
      throw new Error(`Error getting location: ${error}`);
    }
  }
  /**
   * Gets the user's current location information.
   *
   * This method:
   * 1. Requests permission to access device location
   * 2. Gets current device coordinates
   * 3. Fetches location details (city and country) from the location API
   *
   * @returns {Promise<Location | null>} A promise that resolves to a Location object containing city and country code,
   * or null if permission is denied or an error occurs.
   *
   * @example
   * ```typescript
   * const locationRepo = new LocationRepository();
   * const location = await locationRepo.getLocation();
   * if (location) {
   *   console.log(`You are in ${location.city}, ${location.countryCode}`);
   * }
   * ```
   */
  public async getLocation(): Promise<Location | null> {
    try {
      const coords = await this.getCoordinates();

      if (!coords) {
        console.error("Coordinates not found");
        return null;
      }

      const locationData = await this.locationApi.getLocation(
        coords.longitude,
        coords.latitude,
      );

      // Try to find a city name in the response, checking different fields
      const city =
        locationData.address.city ||
        locationData.address.town ||
        locationData.address.village;
      const countryCode = locationData.address.country_code;

      return {
        city: city || "Temuco", // Default to Temuco if no city data is available
        countryCode: countryCode || "cl", // Default to Chile if no country code is available
      };
    } catch (error) {
      console.error("Error fetching location:", error);
      return null;
    }
  }
}
