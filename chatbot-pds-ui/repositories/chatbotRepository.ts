import { ChatbotApi } from "@/api";
import { ChatMessage } from "@/interfaces";
import { mapToChatMessage } from "@/interceptors";

export class ChatbotRepository {
  private chatbotApi: ChatbotApi;

  constructor() {
    this.chatbotApi = new ChatbotApi();
  }

  /**
   * Fetches a chatbot response based on the provided prompt.
   *
   * @param {string} prompt - The prompt to send to the chatbot.
   * @returns {Promise<any>} A promise that resolves to the chatbot response.
   * @throws {Error} If the API request fails or returns an error status code.
   */
  public async getChatbotResponse(prompt: string): Promise<ChatbotMessage> {
    try {
      const response = await this.chatbotApi.getChatbotResponse(prompt);
      if (!response) {
        throw new Error("No response received from the API");
      }
      return mapToChatMessage(response);
    } catch (error) {
      console.error("Error in ChatbotRepository:", error);
      throw new Error("Failed to fetch chatbot response");
    }
  }
}
