import { ActivityIndicator, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import DashboardWeatherCard from '@/components/DashboardWeatherCard';
import { useEffect, useState } from 'react';
import { fetchWeather, WeatherData } from '@/api/weatherApi';

export default function TabOneScreen() {
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const LOCATION = "Temuco"
  
  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeather(LOCATION)
        setWeather(data)
      } catch (error) {
        console.error("Failed to fetch weather", error)
      } finally {
        setLoading(false)
      }
    }

    loadWeather()
  }, [])

  if (loading) {
    return <ActivityIndicator size="large" color="#333" />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {weather && (
        <DashboardWeatherCard location={LOCATION} {...weather}/>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
