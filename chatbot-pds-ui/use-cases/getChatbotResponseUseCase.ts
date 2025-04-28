import { ChatbotRepository } from "@/repositories";
import { ChatMessage } from "@/interfaces";
import { mapToChatMessage } from "@/interceptors";

const chatbotRepository = new ChatbotRepository();

/**
 * Use case for fetching a chatbot response.
 */
export async function getChatbotResponseUseCase(
  prompt: string,
): Promise<ChatMessage> {
  try {
    const response = await chatbotRepository.getChatbotResponse(prompt);
    return response;
  } catch (error) {
    console.error("Error in getChatbotResponseUseCase:", error);
    return mapToChatMessage({
      respuesta:
        "¡Ups! Ocurrió un error al obtener tu respuesta, intentalo más tarde.",
    });
  }
}
