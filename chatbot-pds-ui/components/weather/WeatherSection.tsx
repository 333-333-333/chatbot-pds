/**
 * WeatherSection Component
 *
 * @description
 * Displays current weather information for a specific location with visual indicators
 * for different weather conditions. The component handles three states:
 * 1. Loading state - Shows a spinner while fetching weather data
 * 2. Error state - Shows an error message when weather data is unavailable
 * 3. Data state - Shows formatted weather information with appropriate icons
 *
 * @component
 * @param {WeatherSectionProps} props - The component props
 * @param {LocalizedWeather | undefined} props.localizedWeather - Weather data object with location, temperature, and condition information
 * @param {boolean} props.loading - Indicates if weather data is currently being fetched
 *
 * @returns {JSX.Element} A card displaying weather information, loading indicator, or error message
 *
 * @example
 * // Example with data
 * <WeatherSection
 *   localizedWeather={{
 *     location: { city: "Santiago" },
 *     temperatureCelsius: 25,
 *     temperatureFahrenheit: 77,
 *     humidity: 45,
 *     condition: "clear_sky",
 *     timeOfDay: "day"
 *   }}
 *   loading={false}
 * />
 *
 * // Example while loading
 * <WeatherSection loading={true} />
 *
 * // Example with error
 * <WeatherSection loading={false} />
 */

import React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text } from "@/components/Themed";
import { LocalizedWeather, TimeOfDay } from "@/interfaces";

// Constants
const INFO_ICON_SIZE = 20;
const CONDITION_ICON_SIZE = 70;

/**
 * Valid Material Community icon names used in the weather component
 * @typedef {string} IconName
 */
type IconName =
  | "weather-sunny"
  | "weather-partly-cloudy"
  | "weather-cloudy"
  | "weather-partly-rainy"
  | "weather-rainy"
  | "weather-lightning"
  | "weather-snowy"
  | "weather-fog"
  | "weather-cloudy-alert"
  | "weather-night"
  | "weather-night-partly-cloudy"
  | "thermometer"
  | "thermometer-high"
  | "thermometer-low"
  | "water"
  | "alert-circle-outline";

/**
 * Props for the WeatherSection component
 * @interface WeatherSectionProps
 */
interface WeatherSectionProps {
  /** Weather data object (undefined when data is not available) */
  localizedWeather?: LocalizedWeather;
  /** Indicates if weather data is currently being fetched */
  loading: boolean;
}

/**
 * WeatherSection component implementation
 *
 * @param {WeatherSectionProps} props - Component props
 * @returns {JSX.Element} Weather section component
 */
export default function WeatherSection({
  localizedWeather,
  loading,
}: WeatherSectionProps): JSX.Element {
  // Loading state
  if (loading) {
    return (
      <View style={styles.card} lightColor="#eee" darkColor="#111">
        <View
          style={styles.loadingContainer}
          lightColor="#eee"
          darkColor="#111"
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Cargando datos meteorológicos</Text>
        </View>
      </View>
    );
  }

  // Error state - no weather data available
  if (!localizedWeather) {
    return (
      <View style={styles.card} lightColor="#eee" darkColor="#111">
        <View style={styles.errorContainer} lightColor="#eee" darkColor="#111">
          {getMaterialIcon("alert-circle-outline", "#F44336", 40)}
          <Text style={styles.errorText}>
            No se han podido traer los datos climáticos
          </Text>
        </View>
      </View>
    );
  }

  // Weather data available
  const icon = getConditionIcon(
    localizedWeather.condition,
    localizedWeather.timeOfDay,
  );
  const thermometerIcon = getThermometerIcon(
    localizedWeather.temperatureCelsius,
  );
  const waterPercentIcon = getMaterialIcon("water", "#2196f3", INFO_ICON_SIZE);

  return (
    <View style={styles.card} lightColor="#eee" darkColor="#111">
      <View style={styles.container} lightColor="#eee" darkColor="#111">
        <Text style={styles.title}>
          El clima en {localizedWeather.location.city}
        </Text>
        <Text style={styles.date}>{getFormattedDate()}</Text>
        <View
          style={styles.contentContainer}
          lightColor="#eee"
          darkColor="#111"
        >
          <Text style={styles.icon}>{icon}</Text>
          <View style={styles.infoContainer} lightColor="#eee" darkColor="#111">
            <Text style={styles.infoText}>
              {thermometerIcon}
              {localizedWeather.temperatureCelsius.toFixed(0)}°C /{" "}
              {localizedWeather.temperatureFahrenheit.toFixed(0)}°F
            </Text>
            <Text style={styles.infoText}>
              {waterPercentIcon}
              {localizedWeather.humidity}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/**
 * Returns a formatted date string in the local language format
 *
 * @returns {string} Formatted date string (e.g. "Monday, January 1, 2023")
 */
const getFormattedDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Returns the appropriate weather icon based on weather condition and time of day
 *
 * @param {any} condition - Weather condition code (e.g. "clear_sky", "rain")
 * @param {TimeOfDay} timeOfDay - Current time of day ("day" or "night")
 * @returns {React.ReactElement} MaterialCommunityIcons component with appropriate icon
 */
const getConditionIcon = (
  condition: any,
  timeOfDay: TimeOfDay,
): React.ReactElement => {
  switch (condition) {
    case "clear_sky":
      if (timeOfDay === "day") {
        return getMaterialIcon("weather-sunny", "#f5a623");
      }
      return getMaterialIcon("weather-night", "#90caf9");

    case "few_clouds":
      if (timeOfDay === "day") {
        return getMaterialIcon("weather-partly-cloudy", "#90a4ae");
      }
      return getMaterialIcon("weather-night-partly-cloudy", "#90caf9");

    case "clouds":
      return getMaterialIcon("weather-cloudy", "#90a4ae");

    case "drizzle":
      return getMaterialIcon("weather-partly-rainy", "#4fc3f7");

    case "rain":
      return getMaterialIcon("weather-rainy", "#2196f3");

    case "thunderstorm":
      return getMaterialIcon("weather-lightning", "#fdd835");

    case "snow":
      return getMaterialIcon("weather-snowy", "#90caf9");

    case "mist":
      return getMaterialIcon("weather-fog", "#b0bec5");

    default:
      return getMaterialIcon("weather-cloudy-alert", "#607d8b");
  }
};

/**
 * Returns the appropriate thermometer icon based on temperature
 *
 * @param {number} temperatureCelsius - Temperature in Celsius
 * @returns {React.ReactElement} MaterialCommunityIcons component with appropriate thermometer icon
 */
const getThermometerIcon = (temperatureCelsius: number): React.ReactElement => {
  if (temperatureCelsius >= 25) {
    return getMaterialIcon("thermometer-high", "#e53935", INFO_ICON_SIZE);
  }

  if (temperatureCelsius >= 10) {
    return getMaterialIcon("thermometer", "#43a047", INFO_ICON_SIZE);
  }

  if (temperatureCelsius >= 0) {
    return getMaterialIcon("thermometer-low", "#1e88e5", INFO_ICON_SIZE);
  }

  return getMaterialIcon("thermometer-low", "#1ecbe5", INFO_ICON_SIZE);
};

/**
 * Returns a MaterialCommunityIcons component with specified properties
 *
 * @param {IconName} name - Name of the icon from MaterialCommunityIcons
 * @param {string} color - Color of the icon in hex format
 * @param {number} [size=CONDITION_ICON_SIZE] - Size of the icon in pixels
 * @returns {React.ReactElement} MaterialCommunityIcons component
 */
const getMaterialIcon = (
  name: IconName,
  color: string,
  size: number = CONDITION_ICON_SIZE,
): React.ReactElement => {
  return <MaterialCommunityIcons name={name} color={color} size={size} />;
};

/**
 * Styles for the WeatherSection component
 */
const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 16,
    height: 180,
    width: 260,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#F44336",
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    marginBottom: 16,
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 64,
    paddingRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-around",
    height: 80,
  },
  infoText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
