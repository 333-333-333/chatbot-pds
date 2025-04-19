import { ChatMessage } from "@/interfaces";
import uuid from "react-native-uuid";
/**
 * Interceptor for transforming chatbot messages.
 */
export function mapToChatMessage(response: any): ChatMessage {
  if (!response || !response.respuesta) {
    throw new Error("Unexpected response format");
  }

  return {
    id: uuid.v4(),
    content: response.respuesta,
    isUser: false,
  };
}
