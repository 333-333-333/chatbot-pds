import { FinancialRepository } from "@/repositories";
import { RelevantFinancialData } from "@/interfaces";

// Create a repository instance
const financialRepository = new FinancialRepository();

/**
 * Fetches relevant financial data such as Dolar and UF values.
 * This function adheres to the Single Responsibility Principle by focusing solely
 * on obtaining financial data.
 *
 * @returns {Promise<RelevantFinancialData>} A promise that resolves to the relevant financial data
 * @throws {Error} Throws an error if the financial data cannot be retrieved
 *
 * @example
 * ```typescript
 * // Execute the use case
 * try {
 *   const financialData = await getRelevantFinancialDataUseCase();
 *   console.log(`Dolar Value: ${financialData.dolarValue}`);
 *   console.log(`UF Value: ${financialData.ufValue}`);
 * } catch (error) {
 *   console.error('Failed to get financial data:', error);
 * }
 * ```
 */
export async function getRelevantFinancialData(): Promise<RelevantFinancialData> {
  // Fetch the relevant financial data
  const financialData = await financialRepository.getFinancialData();

  if (!financialData) {
    throw new Error("Financial data not found");
  }

  return financialData;
}
