import { News } from "@/interfaces";
import { Text, View } from "@/components/Themed";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import NewsCard from "@/components/news/NewsCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

/**
 * NewsSection Component
 *
 * @description
 * Displays a section of financial news with cards. The component handles three states:
 * 1. Loading state - Shows a spinner while fetching news data
 * 2. Empty state - Shows a message when no news are available
 * 3. Data state - Shows a scrollable list of news cards
 *
 * The component maintains a consistent height regardless of its state.
 *
 * @component
 * @param {object} props - Component properties
 * @param {News[] | undefined} props.news - Array of news objects to display
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

/**
 * Fixed height (in pixels) for the news section.
 * This constant determines the vertical size of the entire section,
 * both in loading state and when displaying content.
 */
const SECTION_HEIGHT = 300;

/**
 * Icon size for various elements in the component
 */
const ICON_SIZE = 40;

/**
 * Valid Material Community icon names used in the news component
 * @typedef {string} IconName
 */
type IconName =
  | "newspaper"
  | "newspaper-variant-outline"
  | "alert-circle-outli00"
  | "refresh"
  | "information-outline";

export default function NewsSection({
  news,
  loading,
}: {
  news?: News[];
  loading: boolean;
}): JSX.Element {
  // Loading state
  if (loading) {
    return (
      <View style={styles.container} lightColor="#fff" darkColor="#222">
        <View style={styles.loaderContainer} lightColor="#fff" darkColor="#222">
          <ActivityIndicator color="#00FF00" size="large" />
          <Text style={styles.loadingText}>Cargando noticias financieras</Text>
        </View>
      </View>
    );
  }

  // Empty state - no news available
  if (!news || news.length === 0) {
    return (
      <View style={styles.container} lightColor="#fff" darkColor="#222">
        <View style={styles.emptyContainer} lightColor="#fff" darkColor="#222">
          {getMaterialIcon("alert-circle-outline", "#F44336")}
          <Text style={styles.emptyMessage}>
            Error al cargar noticias financieras
          </Text>
        </View>
      </View>
    );
  }

  // News data available
  return (
    <View style={styles.container} lightColor="#fff" darkColor="#222">
      <View style={styles.headerContainer} lightColor="#fff" darkColor="#222">
        <Text style={styles.sectionTitle}>Últimas noticias financieras</Text>
        {getMaterialIcon("newspaper", "#4CAF50", 24)}
      </View>
      <View style={styles.newsContainer}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          {news.map((item, index) => (
            <View key={index} style={styles.newsCardWrapper}>
              <NewsCard news={item} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

/**
 * Returns a MaterialCommunityIcons component with specified properties
 *
 * @param {IconName} name - Name of the icon from MaterialCommunityIcons
 * @param {string} color - Color of the icon in hex format
 * @param {number} [size=ICON_SIZE] - Size of the icon in pixels
 * @returns {React.ReactElement} MaterialCommunityIcons component
 */
const getMaterialIcon = (
  name: IconName,
  color: string,
  size: number = ICON_SIZE,
): React.ReactElement => {
  return <MaterialCommunityIcons name={name} color={color} size={size} />;
};

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
    alignItems: "center",
    borderRadius: 8,
    height: SECTION_HEIGHT + 60,
  },

  /**
   * Container for the header with title and icon
   */
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },

  /**
   * Style for the section title.
   */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 8,
    paddingVertical: 8,
    backgroundColor: "transparent",
  },

  /**
   * Container for news area or loading indicator.
   * Has a fixed height defined by SECTION_HEIGHT.
   */
  newsContainer: {
    height: SECTION_HEIGHT,
    width: "100%",
    backgroundColor: "transparent",
  },

  /**
   * Container for loading indicator.
   * Centers the indicator both vertically and horizontally.
   */
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: SECTION_HEIGHT,
  },

  /**
   * Style for the loading text message.
   */
  loadingText: {
    marginTop: 12,
    fontSize: 16,
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
    height: SECTION_HEIGHT,
    backgroundColor: "transparent",
  },

  /**
   * Style for the empty state message.
   */
  emptyMessage: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
    color: "#F44436",
  },

  /**
   * Style for the ScrollView containing news cards.
   */
  scrollView: {
    width: "100%",
    backgroundColor: "transparent",
  },

  /**
   * Individual container for each news card.
   * Defines margin and padding for each item.
   */
  newsCardWrapper: {
    width: "100%",
  },
});
