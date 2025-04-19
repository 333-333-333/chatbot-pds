import { View, Text } from "@/components/Themed";
import { ChatBubble, ChatInput } from "@/components/chat";
import { FlatList, StyleSheet } from "react-native";
import { ChatMessage } from "@/interfaces";
import { useState } from "react";

export default function TabTwo() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
    };

    const botPlaceholder: ChatMessage = {
      id: Date.now().toString() + "_bot",
      text: "",
      isUser: false,
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, botPlaceholder]);
    setInputText("");
    setIsDisabled(true);

    // Simular respuesta del bot
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botPlaceholder.id
            ? {
                ...msg,
                text: "Esta es una respuesta simulada.",
                isLoading: false,
              }
            : msg,
        ),
      );
      setIsDisabled(false);
    }, 2000);
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
              message={item.text}
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
