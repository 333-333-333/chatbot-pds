import { News } from "@/interfaces";
import { NewsApi } from "@/api";
import { mapResponseToNewsArray } from "@/interceptors/newsInterceptor";

/**
 * Repository class for fetching news data from the API.
 * Acts as an abstraction layer between the API service and the application.
 */
export class NewsRepository {
  /**
   * The API service used to fetch news data.
   * @private
   */
  private newsApi: NewsApi;

  /**
   * Initializes a new instance of the NewsRepository class.
   * Creates an instance of NewsApi for fetching news data.
   */
  constructor() {
    this.newsApi = new NewsApi();
  }

  /**
   * Fetches financial/business news for a specific country.
   * 
   * @param {string} countryCode - The ISO 3166-1 alpha-2 country code (e.g., 'us', 'gb', 'cl').
   * @returns {Promise<News[] | null>} A promise that resolves to an array of News objects if successful,
   *                                   or null if an error occurs during the API request.
   * 
   * @example
   * ```typescript
   * const newsRepo = new NewsRepository();
   * const financialNews = await newsRepo.getFinancialNews('cl');
   * if (financialNews) {
   *   console.log(`Found ${financialNews.length} financial news items`);
   * }
   * ```

      console.log(JSON.stringify(raw, null, 2));
   */
  async getFinancialNewsByCountryCode(
    countryCode: string,
  ): Promise<News[] | null> {
    try {
      const response = await this.newsApi.getFinancialNews(countryCode);

      if (!response) {
        console.warn("No news articles found or unexpected format");
        return null;
      }

      return mapResponseToNewsArray(response);
    } catch (error) {
      console.error("Error fetching news:", error);
      return null;
    }
  }
}
