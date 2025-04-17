import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import WeatherSection from "@/components/weather/WeatherSection";
import { useEffect, useState } from "react";
import { News, LocalizedWeather } from "@/interfaces";
import NewsSection from "@/components/news/NewsSection";
import {
  getCurrentWeather,
  getFinancialNewsByLocationUseCase,
} from "@/use-cases";

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
        console.log(data);
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

  return (
    <View style={styles.container}>
      {/* Sección del clima */}
      <WeatherSection localizedWeather={weather} loading={weatherLoading} />
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
