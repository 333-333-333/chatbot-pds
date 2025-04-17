import { Location } from "@/interfaces";

export function mapResponseToLocation(response: any): Location {
  // Check if the response has the expected structure
  if (!response || !response.address) {
    throw new Error("Unexpected response format");
  }

  // Extract the location data from the response

  // Try to find a city name in the response, checking different fields
  const city =
    response.address.city || response.address.town || response.address.village;
  const countryCode = response.address.country_code;

  return {
    city: city || "Temuco", // Default to Temuco if no city data is available
    countryCode: countryCode || "cl", // Default to Chile if no country code is available
  };
}
