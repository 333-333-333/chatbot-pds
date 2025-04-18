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
const MAIN_ICON_SIZE = 70;
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
  const textColor = "#000";
  const subtitleColor = "#666";
  const mainIconColor = "#2f95dc";
  const errorColor = "#F44336";

  // Obtener fecha actual en formato DD/MM/AAAA
  const currentDate = format(new Date(), "dd/MM/yyyy");

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
      <View style={styles.container} lightColor="#eee" darkColor="#111">
        <View
          style={styles.loadingContainer}
          lightColor="#eee"
          darkColor="#111"
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
      <View style={styles.container} lightColor="#eee" darkColor="#111">
        <View style={styles.errorContainer} lightColor="#eee" darkColor="#111">
          {getMaterialIcon("alert-circle-outline", errorColor, ERROR_ICON_SIZE)}
          <Text style={[styles.messageText, { color: errorColor }]}>
            Error al cargar datos financieros
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} lightColor="#eee" darkColor="#111">
      <View style={styles.dataContainer} lightColor="#eee" darkColor="#111">
        <View style={styles.dataRow} lightColor="#eee" darkColor="#111">
          {getDollarIcon(financialData.dolarValue)}
          <View
            style={styles.valueContainer}
            lightColor="#eee"
            darkColor="#111"
          >
            <Text style={styles.label}>Valor dólar</Text>
            <Text style={styles.value}>
              {financialData.dolarValue !== null
                ? `$${financialData.dolarValue.toLocaleString("es-CL")}`
                : "Sin datos"}
            </Text>
          </View>
        </View>

        <View style={styles.dataRow} lightColor="#eee" darkColor="#111">
          {getUFIcon(financialData.ufValue)}
          <View
            style={styles.valueContainer}
            lightColor="#eee"
            darkColor="#111"
          >
            <Text style={styles.label}>Valor UF</Text>
            <Text style={styles.value}>
              {financialData.ufValue !== null
                ? `$${financialData.ufValue.toLocaleString("es-CL")}`
                : "Sin datos"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140, // Ancho menor, como en el otro componente
    borderRadius: 12,
    padding: 16,
    height: 140, // Altura fija igual al otro componente
    justifyContent: "space-between",
    marginHorizontal: 16, // Igual que el otro componente
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginRight: 4,
  },
  dataContainer: {
    marginTop: 12,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  valueContainer: {
    marginLeft: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    fontSize: 14,
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
