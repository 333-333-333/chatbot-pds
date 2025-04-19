import { RelevantFinancialData } from "@/interfaces";
import { View, Text } from "@/components/Themed";
import { StyleSheet, ActivityIndicator } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { format } from "date-fns";

// Define nombres de íconos que usaremos
type IconName =
  | "currency-usd"
  | "currency-usd-off"
  | "chart-line"
  | "chart-line-variant"
  | "calendar-today"
  | "alert-circle-outline";

// Constantes para tamaños de íconos
const INFO_ICON_SIZE = 20;
const ERROR_ICON_SIZE = 40;

interface FinancialSectionProps {
  financialData?: RelevantFinancialData;
  loading?: boolean;
}

export default function FinancialSection({
  financialData,
  loading = false,
}: FinancialSectionProps): JSX.Element {
  // Colores fijos sin useThemeColor
  const subtitleColor = "#666";
  const mainIconColor = "#2f95dc";
  const errorColor = "#F44336";

  // Función para obtener íconos con estilo adecuado
  const getMaterialIcon = (name: IconName, color: string, size: number) => (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={styles.icon}
    />
  );

  // Función para obtener el ícono del dólar basado en su valor
  const getDollarIcon = (value: number | null) => {
    if (value === null || isNaN(value)) {
      return getMaterialIcon("currency-usd-off", subtitleColor, INFO_ICON_SIZE);
    }
    return getMaterialIcon("currency-usd", mainIconColor, INFO_ICON_SIZE);
  };

  // Función para obtener el ícono de UF basado en su valor
  const getUFIcon = (value: number | null) => {
    if (value === null || isNaN(value)) {
      return getMaterialIcon(
        "alert-circle-outline",
        subtitleColor,
        INFO_ICON_SIZE,
      );
    }
    return getMaterialIcon("chart-line-variant", mainIconColor, INFO_ICON_SIZE);
  };

  // Vista de carga
  if (loading) {
    return (
      <View style={styles.container} lightColor="#fff" darkColor="#222">
        <View
          style={styles.loadingContainer}
          lightColor="#fff"
          darkColor="#222"
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.messageText}>Cargando datos financieros...</Text>
        </View>
      </View>
    );
  }

  // Vista de error
  if (!financialData) {
    return (
      <View style={styles.container} lightColor="#fff" darkColor="#222">
        <View style={styles.errorContainer} lightColor="#fff" darkColor="#222">
          {getMaterialIcon("alert-circle-outline", errorColor, ERROR_ICON_SIZE)}
          <Text style={[styles.messageText, { color: errorColor }]}>
            Error al cargar datos financieros
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} lightColor="#fff" darkColor="#222">
      <View style={styles.dataRow} lightColor="#fff" darkColor="#222">
        {getDollarIcon(financialData.dolarValue)}
        <View style={styles.valueContainer} lightColor="#fff" darkColor="#222">
          <Text style={styles.label}>Dólar</Text>
          <Text style={styles.value}>
            {financialData.dolarValue !== null
              ? `$${Math.round(financialData.dolarValue).toLocaleString("es-CL")}`
              : "Sin datos"}
          </Text>
        </View>
      </View>

      <View style={styles.dataRow} lightColor="#fff" darkColor="#222">
        {getUFIcon(financialData.ufValue)}
        <View style={styles.valueContainer} lightColor="#fff" darkColor="#222">
          <Text style={styles.label}>UF</Text>
          <Text style={styles.value}>
            {financialData.ufValue !== null
              ? `$${Math.round(financialData.ufValue).toLocaleString("es-CL")}`
              : "Sin datos"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    borderRadius: 8,
    padding: 16,
    height: 140,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  icon: {
    marginRight: 4,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  valueContainer: {
    marginLeft: 4,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  // Nuevos estilos para estados de carga y error, idénticos al otro componente
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
  messageText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: "center",
  },
});
