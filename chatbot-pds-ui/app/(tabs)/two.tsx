import { View } from "@/components/Themed";
import { ChatBubble, ChatInput } from "@/components/chat";
import { FlatList, StyleSheet } from "react-native";
import { ChatMessage } from "@/interfaces";
import { useState, useEffect } from "react";
import {
  getChatbotResponseUseCase,
  getChatbotWelcomeUseCase,
} from "@/use-cases";

export default function TabTwo() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  // Cargar el mensaje de bienvenida cuando se monta el componente
  useEffect(() => {
    const loadWelcomeMessage = async () => {
      try {
        const welcomeMessage = await getChatbotWelcomeUseCase();
        setMessages([welcomeMessage]);
      } catch (error) {
        console.error("Error loading welcome message:", error);
      }
    };

    loadWelcomeMessage();
  }, []);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      content: inputText,
      isUser: true,
    };

    const botPlaceholder = {
      id: Date.now().toString() + "_bot",
      content: "",
      isUser: false,
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, botPlaceholder]);
    setInputText("");
    setIsDisabled(true);

    try {
      const botResponse = await getChatbotResponseUseCase(inputText);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botPlaceholder.id
            ? {
                ...msg,
                content: botResponse.content,
                isLoading: false,
              }
            : msg,
        ),
      );
    } catch (error) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botPlaceholder.id
            ? {
                ...msg,
                content:
                  "Lo siento, ha ocurrido un error al procesar tu mensaje.",
                isLoading: false,
              }
            : msg,
        ),
      );
      console.error("Error getting chatbot response:", error);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <View style={styles.wrapper} lightColor="#f1f1f1">
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ paddingHorizontal: 8, backgroundColor: "transparent" }}
          >
            <ChatBubble
              message={item.content}
              isUser={item.isUser}
              isLoading={item.isLoading}
            />
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />
      <ChatInput
        value={inputText}
        onChange={setInputText}
        onSend={handleSend}
        disabled={isDisabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "transparent",
  },
  chatContainer: {
    paddingBottom: 16,
  },
});
