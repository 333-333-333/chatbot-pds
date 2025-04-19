import { View, Text } from "@/components/Themed";
import { ActivityIndicator, StyleSheet } from "react-native";

/**
 * Props for the ChatBubble component.
 * @interface ChatBubbleProps
 * @property {string} message - The text content of the chat message
 * @property {boolean} isUser - Whether the message is from the user (true) or the chatbot (false)
 * @property {boolean} [isLoading] - Optional flag to show loading state instead of message content
 */
interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  isLoading?: boolean;
}

/**
 * Renders a chat message bubble with different styling based on sender.
 *
 * @component
 * @example
 * // User message
 * <ChatBubble message="Hello there!" isUser={true} />
 *
 * // Bot message with loading state
 * <ChatBubble message="" isUser={false} isLoading={true} />
 *
 * @param {ChatBubbleProps} props - Component props
 * @returns {React.ReactElement} Rendered chat bubble component
 */
export function ChatBubble({
  message,
  isUser,
  isLoading,
}: ChatBubbleProps): React.ReactElement {
  // Determine bubble colors based on the sender
  const lightColor = isUser ? "#fff" : "#29f";
  const darkColor = isUser ? "#222" : "#29f";

  // Determine sender label
  const senderLabel = isUser ? "Usuario" : "Chatbot";

  return (
    <View style={styles.container}>
      {/* Sender label with appropriate alignment */}
      <Text style={[styles.label, isUser ? styles.userLabel : styles.botLabel]}>
        {senderLabel}
      </Text>

      {/* Chat bubble with conditional styling based on sender */}
      <View
        style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
        lightColor={lightColor}
        darkColor={darkColor}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#00f" />
        ) : (
          <Text style={styles.message}>{message}</Text>
        )}
      </View>
    </View>
  );
}

/**
 * Styles for the ChatBubble component
 */
const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
    backgroundColor: "transparent",
  },
  bubble: {
    padding: 10,
    borderRadius: 20,
    maxWidth: "80%",
  },
  userBubble: {
    alignSelf: "flex-start",
    borderBottomRightRadius: 5,
  },
  botBubble: {
    alignSelf: "flex-end",
    borderBottomLeftRadius: 5,
  },
  message: {
    fontSize: 14,
  },
  label: {
    fontSize: 12,
    margin: 4,
    opacity: 0.7,
  },
  userLabel: {
    textAlign: "left",
  },
  botLabel: {
    textAlign: "right",
  },
});
