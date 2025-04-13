import React from 'react';
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Card, View, Text } from 'react-native-ui-lib';
import { Condition, TimeOfDay, WeatherData } from '@/api/weatherApi';

interface DashboardWeatherCardProps extends WeatherData {
    location: string
}

const INFO_ICON_SIZE = 20

const DashboardWeatherCard: React.FC<DashboardWeatherCardProps> = ({ location, condition, timeOfDay, temperatureC, humidity }) => {
    const temperatureF = (temperatureC * 9) / 5 + 32
    const icon = getConditionIcon(condition, timeOfDay)
    const thermometerIcon = getThermometerIcon(temperatureC)
    const waterPercentIcon = getMaterialIcon("water", "#2196f3", INFO_ICON_SIZE)

    return (
        <Card style={styles.card}>
            <View style={styles.container}>
                <Text style={styles.title}>El clima en {location}</Text>
                <Text style={styles.date}>{getFormattedDate()}</Text>
                <View style={styles.contentContainer}>
                    <Text style={styles.icon}>{icon}</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>{thermometerIcon}{temperatureC.toFixed(0)}°C / {temperatureF.toFixed(0)}°F</Text>
                        <Text style={styles.infoText}>{waterPercentIcon}{humidity}%</Text>
                    </View>
                </View>
            </View>
        </Card>
    )
}

const getFormattedDate = (): string => {
    const now = new Date()
    return now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

const getConditionIcon = (condition: Condition, timeOfDay: TimeOfDay): React.ReactElement => {
    switch (condition) {
        case "clear_sky":
            if (timeOfDay == "day") {
                return getMaterialIcon("weather-sunny", "#f5a623")
            }

            return getMaterialIcon("weather-night", "#90caf9")
        case "few_clouds":
            if (timeOfDay == "day") {
                return getMaterialIcon("weather-partly-cloudy", "#90a4ae")
            }

            return getMaterialIcon("weather-night-partly-cloudy", "#90caf9")
        case "clouds":
            return getMaterialIcon("weather-cloudy", "#90a4ae")
        case "drizzle":
            return getMaterialIcon("weather-partly-rainy", "#4fc3f7")
        case "rain":
            return getMaterialIcon("weather-rainy", "#2196f3")
        case "thunderstorm":
            return getMaterialIcon("weather-lightning", "#fdd835")
        case "snow":
            return getMaterialIcon("weather-snowy", "#90caf9")
        case "mist":
            return getMaterialIcon("weather-fog", "#b0bec5")
        default:
            return getMaterialIcon("weather-cloudy-alert", "#607d8b")
    }
}

const getThermometerIcon = (temperatureC: number): React.ReactElement => {
    if (temperatureC >= 25) {
        return getMaterialIcon("thermometer-high", "#e53935", INFO_ICON_SIZE)
    }

    if (temperatureC >= 10) {
        return getMaterialIcon("thermometer", "#43a047", INFO_ICON_SIZE)
    }

    if (temperatureC >= 0) {
        return getMaterialIcon("thermometer-low", "#1e88e5", INFO_ICON_SIZE)
    }

    return getMaterialIcon("thermometer-low", "#1ecbe5", INFO_ICON_SIZE)
}

const CONDITION_ICON_SIZE = 70

type IconName = "weather-sunny" | "weather-partly-cloudy" | "weather-cloudy" | "weather-partly-rainy" | "weather-rainy"
    | "weather-lightning" | "weather-snowy" | "weather-fog" | "weather-cloudy-alert" | "weather-night" | "weather-night-partly-cloudy"
    | "thermometer" | "thermometer-high" | "thermometer-low" | "water"

const getMaterialIcon = (name: IconName, color: string, size: number = CONDITION_ICON_SIZE): React.ReactElement => {
    return <MaterialCommunityIcons name={name} color={color} size={size} />
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 20,
        elevation: 4,
        minWidth: 250,
    },
    container: {
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 4,
        color: "#333333",
    },
    date: {
        fontSize: 14,
        color: '#777',
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
        fontSize: 20,
        fontWeight: "500",
        color: "#333333",
    },
})

export default DashboardWeatherCard
