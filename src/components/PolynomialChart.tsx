// components/PolynomialChart.tsx
import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface PolynomialChartProps {
  data: { x: number; y: number }[];
  equation: string;
}

const PolynomialChart: React.FC<PolynomialChartProps> = ({ data, equation }) => {
  if (data.length === 0) return null;

  // Tomamos solo unos pocos puntos para las etiquetas del eje X para no saturar
  const labels = data
    .filter((_, index) => index % 20 === 0)
    .map(p => p.x.toString());

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data.map(p => p.y),
        color: (opacity = 1) => `rgba(0, 96, 100, ${opacity})`, // #006064
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#f0ffff',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(0, 151, 167, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 96, 100, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '0',
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid lines
      stroke: '#e0f7fa',
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Visualización del Polinomio</Text>
      <View style={styles.chartWrapper}>
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={240}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withDots={false}
          withInnerLines={true}
          withOuterLines={true}
          withVerticalLines={true}
          withHorizontalLines={true}
          verticalLabelRotation={0}
        />
      </View>
      <View style={styles.legend}>
        <View style={[styles.legendColor, { backgroundColor: '#0097a7' }]} />
        <Text style={styles.legendText}>f(x) = {equation.replace(' = 0', '')}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginVertical: 20,
    elevation: 8,
    shadowColor: '#006064',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0f7fa',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006064',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  chartWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#006064',
    fontWeight: '600',
  },
  axisLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: -5,
  },
});

export default PolynomialChart;
