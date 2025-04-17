import { LocationRepository, WeatherRepository } from "@/repositories";
import { LocalizedWeather } from "@/interfaces";

const locationRepository = new LocationRepository();
const weatherRepository = new WeatherRepository();

export async function getCurrentWeather(): Promise<LocalizedWeather | null> {
  const coordinates = await locationRepository.getCoordinates();
  const location = await locationRepository.getLocation();

  if (!coordinates || !location) {
    throw new Error(
      "User current location not found, or no permission was given to request it",
    );
  }

  const weather = await weatherRepository.getCurrentWeather(coordinates);

  if (!weather) {
    throw new Error(
      `Current weather could not be fetched for location ${location}`,
    );
  }

  return {
    location,
    ...weather,
  };
}
