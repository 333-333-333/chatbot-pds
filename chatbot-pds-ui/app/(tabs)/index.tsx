import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { News } from '@/interfaces';
import NewsSection from '@/components/news/NewsSection';

import { getFinancialNewsByLocationUseCase } from '@/use-cases/getFinancialNewsByLocationUseCase';
export default function TabOneScreen() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('TabOneScreen mounted');
    // Example usage of the use use-casei
    const getNews = async () => {
      try {
        const news = await getFinancialNewsByLocationUseCase();
        console.log('Fetched news:', news);
        setNews(news);
      } catch (error) {
        console.error('Error fetching financial news:', error);
      } finally {
        setLoading(false);
      }
    }
    getNews();
    return () => {
      console.log('TabOneScreen unmounted');
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <NewsSection news={news} loading={loading} />
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
