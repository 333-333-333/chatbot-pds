/**
 * The base URL for the financial API obtained from environment variables.
 * @constant
 */
const API_URL = process.env.EXPO_PUBLIC_FINANCIAL_API_URL;

/**
 * @class FinancialApi
 * @description Provides methods for interacting with the financial data API.
 * Handles API requests, responses, and error management for financial operations.
 */
export class FinancialApi {
  /**
   * Fetches financial data from the configured API endpoint.
   *
   * @returns {Promise<FinancialDataResponse>} A promise that resolves to the financial data.
   * @throws {Error} If the API request fails or returns an error status code.
   *
   * @example
   * ```typescript
   * const financialApi = new FinancialApi();
   *
   * try {
   *   const data = await financialApi.getFinancialData();
   *   console.log('Financial data:', data);
   * } catch (error) {
   *   console.error('Failed to get financial data:', error.message);
   * }
   * ```
   */
  public async getFinancialData(): Promise<any> {
    if (!API_URL) {
      throw new Error("API URL is not defined");
    }

    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching financial data:", error);
      throw new Error("Failed to fetch financial data");
    }
  }
}
