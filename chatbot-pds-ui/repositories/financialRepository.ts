import { RelevantFinancialData } from "@/interfaces";
import { mapToRelevantFinancialData } from "@/interceptors";
import { FinancialApi } from "@/api";

export class FinancialRepository {
  private financialApi: FinancialApi;

  constructor() {
    this.financialApi = new FinancialApi();
  }

  /**
   * Fetches financial data and maps it to the relevant format.
   *
   * @returns {Promise<RelevantFinancialData>} A promise that resolves to the mapped financial data.
   * @throws {Error} If the API request fails or returns an error status code.
   */
  public async getFinancialData(): Promise<RelevantFinancialData> {
    try {
      const data = await this.financialApi.getFinancialData();

      if (!data) {
        throw new Error("No data received from the API");
      }

      return mapToRelevantFinancialData(data);
    } catch (error) {
      console.error("Error in FinancialRepository:", error);
      throw new Error("Failed to fetch financial data");
    }
  }
}
