import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import WeatherSection from "@/components/weather/WeatherSection";
import { useEffect, useState } from "react";
import { News, LocalizedWeather } from "@/interfaces";
import NewsSection from "@/components/news/NewsSection";
import { getCurrentWeather } from "@/use-cases/getCurrentWeatherUseCase";
import { getFinancialNewsByLocationUseCase } from "@/use-cases/getFinancialNewsByLocationUseCase";

export default function TabOneScreen() {
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weather, setWeather] = useState<LocalizedWeather | null>(null);
  const [news, setNews] = useState<News[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  // Cargar datos del clima
  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getCurrentWeather();
        setWeather(data);
      } catch (error) {
        console.error("Failed to fetch weather", error);
      } finally {
        setWeatherLoading(false);
      }
    };

    loadWeather();
  }, []);

  // Cargar noticias financieras
  useEffect(() => {
    const getNews = async () => {
      try {
        const news = await getFinancialNewsByLocationUseCase();
        setNews(news);
      } catch (error) {
        console.error("Error fetching financial news:", error);
      } finally {
        setNewsLoading(false);
      }
    };

    getNews();
  }, []);

  // Mostrar indicador de carga mientras se cargan los datos iniciales
  if (weatherLoading && newsLoading) {
    return <ActivityIndicator size="large" color="#333" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      {/* Sección del clima */}
      {weather && <WeatherSection {...weather} />}

      {/* Sección de noticias */}
      <NewsSection news={news} loading={newsLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
