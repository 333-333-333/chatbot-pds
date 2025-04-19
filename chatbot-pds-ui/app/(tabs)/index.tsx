import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import WeatherSection from "@/components/weather/WeatherSection";
import FinancialSection from "@/components/financial/FinancialSection";
import { useEffect, useState } from "react";
import { News, LocalizedWeather, RelevantFinancialData } from "@/interfaces";
import NewsSection from "@/components/news/NewsSection";
import {
  getCurrentWeather,
  getFinancialNewsByLocationUseCase,
  getRelevantFinancialData,
} from "@/use-cases";

export default function TabOneScreen() {
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [weather, setWeather] = useState<LocalizedWeather>(null);
  const [news, setNews] = useState<News[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [financialData, setFinancialData] =
    useState<RelevantFinancialData>(null);
  const [financialDataLoading, setFinancialDataLoading] = useState(true);

  // Cargar datos del clima
  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await getCurrentWeather();
        if (!data) {
          throw new Error("Weather data not found");
        }
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

  // Cargar datos financieros relevantes
  useEffect(() => {
    const getFinancialData = async () => {
      try {
        setFinancialDataLoading(true);

        const data = await getRelevantFinancialData();
        setFinancialData(data);
      } catch (error) {
        console.error("Error fetching financial data:", error);
      } finally {
        setFinancialDataLoading(false);
      }
    };

    getFinancialData();
  }, []);

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const today = new Date();

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return capitalizeFirstLetter(date.toLocaleDateString("es-CL", options));
  };

  return (
    <View style={styles.container} lightColor="#f1f1f1">
      {/* Fecha de hoy formateada en texto */}
      <Text style={styles.title}>{formatDate(today)}</Text>

      {/* Separador */}
      {/* Sección de clima y datos financieros */}
      {/* Contenedor para clima y datos financieros */}
      <View style={styles.topSectionsContainer} lightColor="#f1f1f1">
        {/* Sección del clima */}
        <WeatherSection localizedWeather={weather} loading={weatherLoading} />

        {/* Sección financiera */}
        <FinancialSection
          financialData={financialData}
          loading={financialDataLoading}
        />
      </View>

      {/* Sección de noticias */}
      <View style={styles.newsSectionsContainer} lightColor="#f1f1f1">
        <NewsSection news={news} loading={newsLoading} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    paddingHorizontal: 16,
  },
  topSectionsContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  newsSectionsContainer: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    margin: 8,
    fontWeight: "bold",
  },
});
