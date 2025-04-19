import { StyleSheet } from "react-native";
import { View, TextInput, Button } from "@/components/Themed";

interface ChatInputProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  disabled?: boolean;
}
export function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
}: ChatInputProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textarea}
        placeholder="Escribe un mensaje..."
        multiline
        value={value}
        onChangeText={onChange}
        editable={!disabled}
      />
      <Button
        title="Enviar"
        onPress={onSend}
        disabled={disabled || value.trim() === ""}
        lightColor="#ddd"
        darkColor="#222"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    alignItems: "flex-end",
    gap: 8,
    backgroundColor: "transparent",
  },
  textarea: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
});
