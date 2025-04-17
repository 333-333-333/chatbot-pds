import { News } from "@/interfaces";

/**
 * Transforms a raw news API response into a standardized News array format
 *
 * This function processes the response from a news API, mapping each item to
 * our application's consistent News interface structure:
 * - title: The news article headline
 * - url: The link to the full article
 * - description: A brief summary of the article content
 *
 * @param {any} response - The raw response data from the news API
 * @returns {News[]} A properly formatted array of News objects
 * @throws {Error} When the response is not an array or has unexpected structure
 *
 * @example
 * // API returns: [{ title: "Breaking News", link: "https://example.com", description: "..." }]
 * const news = mapResponseToNewsArray(apiResponse);
 * // Result: [{ title: "Breaking News", url: "https://example.com", description: "..." }]
 */
export function mapResponseToNewsArray(response: any): News[] {
  // Assuming that response has an results property that is an array
  const results = response.results;

  if (!Array.isArray(results)) {
    throw new Error("Unexpected response format");
  }
  return results.map((item: any) => ({
    title: item.title,
    url: item.link,
    description: item.description,
    image_uri: item.image_url || item.image,
  }));
}
