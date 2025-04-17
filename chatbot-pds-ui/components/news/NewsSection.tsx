import { News } from "@/interfaces";
import { Text, View } from "@/components/Themed";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import NewsCard from "@/components/news/NewsCard";

/**
 * Fixed height (in pixels) for the news section.
 * This constant determines the vertical size of the entire section,
 * both in loading state and when displaying content.
 */
const SECTION_HEIGHT = 360;

/**
 * Component that displays a section of financial news.
 *
 * This component shows a section title followed by a list of news cards
 * or a loading indicator. It maintains a constant height regardless of
 * its state (loading or displaying news). If no news are available,
 * it displays a message to the user.
 *
 * @component
 * @param {object} props - Component properties
 * @param {News[]} props.news - Array of news objects to display
 * @param {boolean} props.loading - Loading state: true if loading, false if data is ready
 * @returns {JSX.Element} - Rendered news section component
 *
 * @example
 * // Usage example
 * <NewsSection
 *   news={newsData}
 *   loading={isLoading}
 * />
 */
export default function NewsSection({
  news,
  loading,
}: {
  news: News[];
  loading: boolean;
}): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Últimas noticias financieras</Text>
      <View style={styles.newsContainer}>
        {loading ? (
          // Shows centered loading indicator when loading=true
          <View style={styles.loaderContainer}>
            <ActivityIndicator color="#00FF00" size="large" />
          </View>
        ) : news.length === 0 ? (
          // Shows message when no news are available
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyMessage}>
              ¡Ups! No hay noticias financieras relevantes, regresa más tarde
            </Text>
          </View>
        ) : (
          // Shows scrollable news list when news are available
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={true}
          >
            {news.map((item, index) => (
              <View key={index} style={styles.newsCardWrapper}>
                <NewsCard news={item} />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

/**
 * Styles for the NewsSection component.
 *
 * Defines the visual appearance of the news section, including
 * containers, title, spacing, and element configuration.
 */
const styles = StyleSheet.create({
  /**
   * Main container wrapping the entire section.
   */
  container: {
    width: "100%",
  },

  /**
   * Style for the section title.
   */
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginLeft: 16,
  },

  /**
   * Container for news area or loading indicator.
   * Has a fixed height defined by SECTION_HEIGHT.
   */
  newsContainer: {
    height: SECTION_HEIGHT,
    width: "100%",
  },

  /**
   * Container for loading indicator.
   * Centers the indicator both vertically and horizontally.
   */
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /**
   * Container for the empty state message.
   * Centers the message both vertically and horizontally.
   */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  /**
   * Style for the empty state message.
   */
  emptyMessage: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
  },

  /**
   * Style for the ScrollView containing news cards.
   */
  scrollView: {
    width: "100%",
  },

  /**
   * Individual container for each news card.
   * Defines margin and padding for each item.
   */
  newsCardWrapper: {
    width: "100%",
    marginBottom: 8,
    paddingHorizontal: 8,
  },
});
