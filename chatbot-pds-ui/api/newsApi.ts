/**
 * NewsApi - Client for fetching news articles from the News API service
 *
 * This class provides methods to retrieve top headlines from the News API
 * based on country code and category filters.
 */

/**
 * Base URL for the News API from environment variables,
 */
const API_URL = process.env.EXPO_PUBLIC_NEWS_API_URL;

export class NewsApi {
  /**
   * Fetches top headlines news articles based on country and category
   *
   * @param countryCode - The 2-letter ISO 3166-1 country code (e.g., 'us', 'gb', 'cl')
   * @param category - The news category to filter by (e.g., 'business', 'technology', 'sports')
   * @returns A Promise resolving to the News API response object containing articles
   * @throws Will throw an error if the API request fails or returns a non-200 status
   *
   * @example
   * ```typescript
   * const newsApi = new NewsApi();
   * try {
   *   const news = await newsApi.getNews('us', 'technology');
   *   console.log(`Found ${news.totalResults} articles`);
   * } catch (error) {
   *   console.error('Failed to get news:', error);
   * }
   * ```
   */
  public async getFinancialNews(countryCode: string): Promise<any> {
    try {
      if (!API_URL) {
        throw new Error("API URL is not defined");
      }

      const url = `${API_URL}?apikey=${process.env.EXPO_PUBLIC_NEWS_API_KEY}&country=${countryCode}&category=business`;

      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching news:", error);
      throw new Error("Failed to fetch news");
    }
  }
}
