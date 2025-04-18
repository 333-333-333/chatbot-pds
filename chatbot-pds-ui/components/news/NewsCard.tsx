import { News } from "@/interfaces";
import { Text, View } from "@/components/Themed";
import { StyleSheet, Image, TouchableOpacity, Linking } from "react-native";

export default function NewsCard({ news }: { news: News }) {
  const { title, url, description, image_uri } = news;

  const handlePress = async () => {
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      await Linking.openURL(url);
    } else {
      console.error("No se puede abrir la URL:", url);
    }
  };

  // Truncate description to a maximum of 100 characters
  const truncateDescription = (description: string, maxLength: number) => {
    if (!description) return "Sin descripción";
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ width: "100%" }}>
      <View style={styles.container} lightColor="#eee" darkColor="#111">
        <View style={styles.imageContainer}>
          <Image source={{ uri: image_uri }} style={styles.image} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>
          {truncateDescription(description, 100)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  container: {
    padding: 16,
  },
  imageContainer: {
    backgroundColor: null,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 4,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
});
