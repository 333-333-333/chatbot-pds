const API_URL = process.env.EXPO_PUBLIC_CHATBOT_API_URL;

/**
 * @class ChatbotApi
 * @description Provides methods for interacting with the chatbot API.
 * Handles API requests, responses, and error management for chatbot operations.
 */
export class ChatbotApi {
  /**
   * Fetches chatbot data from the configured API endpoint.
   *
   * @param {string} prompt - The prompt to send to the chatbot.
   * @returns {Promise<any>} A promise that resolves to the chatbot response.
   * @throws {Error} If the API request fails or returns an error status code.
   *
   * @example
   * ```typescript
   * const chatbotApi = new ChatbotApi();
   *
   * try {
   *   const response = await chatbotApi.getChatbotResponse("Hello, how are you?");
   *   console.log('Chatbot response:', response);
   * } catch (error) {
   *   console.error('Failed to get chatbot response:', error.message);
   * }
   * ```
   */
  public async getChatbotResponse(prompt: string): Promise<any> {
    if (!API_URL) {
      throw new Error("API URL is not defined");
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ texto: prompt }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
      throw new Error("Failed to fetch chatbot response");
    }
  }

  /**
   * Gets welcome message from API.
   *
   * @returns {Promise<any>} A promise that resolves to the welcome message.
   * @throws {Error} If the API request fails or returns an error status code.
   *
   * @example
   * ```typescript
   * const chatbotApi = new ChatbotApi();
   *  try {
   *  const welcomeMessage = await chatbotApi.getWelcomeMessage();
   *  console.log('Welcome message:', welcomeMessage);
   *  } catch (error) {
   *  console.error('Failed to get welcome message:', error.message);
   *  }
   *  ```
   *  */
  public async getWelcomeMessage(): Promise<any> {
    if (!API_URL) {
      throw new Error("API URL is not defined");
    }

    try {
      const response = await fetch(`${API_URL}/bienvenida`, {
        method: "GET",
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
      console.error("Error fetching welcome message:", error);
      throw new Error("Failed to fetch welcome message");
    }
  }
}
