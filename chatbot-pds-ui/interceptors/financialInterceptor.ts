import { RelevantFinancialData } from "@/interfaces";

export function mapToRelevantFinancialData(
  response: any,
): RelevantFinancialData {
  if (!response || !response.dolar || !response.uf) {
    throw new Error("Unexpected response format");
  }

  return {
    dolarValue: response.dolar.valor,
    ufValue: response.uf.valor,
  };
}
