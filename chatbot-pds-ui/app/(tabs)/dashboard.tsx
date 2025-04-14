import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function Dashboard() {
  const [uf, setUf] = useState<number | null>(null);
  const [dolar, setDolar] = useState<number | null>(null);
  const [fecha, setFecha] = useState<string | null>(null);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get('https://mindicador.cl/api');

      // 👇 PON ESTO AQUÍ
      console.log('✅ Respuesta:', response.data);
      console.log('📊 UF:', response.data.uf.valor);
      console.log('💵 Dólar:', response.data.dolar.valor);

      // 👇 Luego actualizas los estados
      setUf(response.data.uf.valor);
      setDolar(response.data.dolar.valor);
      setFecha(response.data.fecha);
    } catch (error) {
      console.error('❌ Error al obtener datos:', error);
    }
  }

  fetchData();
}, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indicadores Económicos</Text>
      {uf !== null && dolar !== null ? (
        <>
          <Text style={styles.text}>💸 UF: ${uf.toLocaleString()}</Text>
          <Text style={styles.text}>💵 Dólar: ${dolar.toLocaleString()}</Text>
          <Text style={styles.date}>📅 Fecha: {new Date(fecha!).toLocaleDateString()}</Text>
        </>
      ) : (
        <Text style={styles.text}>Cargando...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  text: { fontSize: 18, marginVertical: 4 },
  date: { fontSize: 14, color: '#666', marginTop: 12 },
});
