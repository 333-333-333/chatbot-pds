import { ChatbotRepository } from "@/repositories";
import { ChatMessage } from "@/interfaces";
import { mapToChatMessage } from "@/interceptors";

const chatbotRepository = new ChatbotRepository();

/**
 * Use case for fetching the welcome message.
 */
export async function getChatbotWelcomeUseCase(): Promise<ChatMessage> {
  try {
    const response = await chatbotRepository.getWelcomeMessage();
    return response;
  } catch (error) {
    console.error("Error in getChatbotWelcomeUseCase:", error);
    return mapToChatMessage({
      respuesta:
        "¡Ups! Ocurrió un error al obtener tu mensaje de bienvenida, intentalo más tarde.",
    });
  }
}
