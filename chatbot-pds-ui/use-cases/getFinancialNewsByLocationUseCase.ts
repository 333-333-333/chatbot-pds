import { LocationRepository, NewsRepository } from "@/repositories";
import { News } from "@/interfaces";

// Create repositories
const locationRepository = new LocationRepository();
const newsRepository = new NewsRepository();

/**
 * Fetches financial news based on the user's current location.
 * This function adheres to the Single Responsibility Principle by focusing solely
 * on obtaining location-based financial news.
 *
 * @returns {Promise<News[]>} A promise that resolves to an array of News objects
 * @throws {Error} Throws an error if location data cannot be retrieved
 *
 * @example
 * ```typescript
 * // Create repositories
 * const locationRepo = new LocationRepository();
 * const newsRepo = new NewsRepository();
 *
 * // Execute the use case
 * try {
 *   const financialNews = await getFinancialNewsByLocation(locationRepo, newsRepo);
 *   console.log(`Found ${financialNews.length} financial news articles`);
 * } catch (error) {
 *   console.error('Failed to get location-based news:', error);
 * }
 * ```
 */
export async function getFinancialNewsByLocationUseCase(): Promise<News[]> {
  // Get the coordinates of the location
  const location = await locationRepository.getLocation();

  if (!location) {
    throw new Error("Location not found");
  }

  // Get the financial news based on the coordinates
  const news = await newsRepository.getFinancialNewsByCountryCode(
    location.countryCode,
  );
  return news || [];
}
