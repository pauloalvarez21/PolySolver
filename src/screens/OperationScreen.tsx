// OperationScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import usePolynomialSolver from '../hooks/usePolynomialSolver';
import CoefficientInput from '../components/CoefficientInput';
import PolynomialChart from '../components/PolynomialChart';

const OperationScreen = () => {
  const {
    degree,
    setDegree,
    coefficients,
    updateCoefficient,
    equation,
    solutions,
    graphData,
    error,
    solve,
    clear,
    formatSolutions,
  } = usePolynomialSolver();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>PolySolver</Text>

        <View style={styles.equationContainer}>
          <Text style={styles.equationText}>axⁿ + ... + c = 0</Text>
          <Text style={styles.equationSubtext}>ax = 0</Text>
        </View>

        <View style={styles.configRow}>
          <TouchableOpacity style={styles.configButton}>
            <Text style={styles.configButtonText}>Calculate Roots</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.configButton}>
            <Text style={styles.configButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>Equation Degree</Text>
        <View style={styles.degreeSelector}>
          {[1, 2, 3, 4, 5].map(deg => (
            <TouchableOpacity
              key={deg}
              style={[
                styles.degreeButton,
                degree === deg && styles.degreeButtonActive,
              ]}
              onPress={() => setDegree(deg)}
            >
              <Text
                style={[
                  styles.degreeButtonText,
                  degree === deg && styles.degreeButtonTextActive,
                ]}
              >
                {deg}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.coefficientsContainer}>
          {Array.from({ length: degree + 1 }).map((_, index) => {
            const labels = ['a', 'b', 'c', 'd', 'e', 'f'];
            const powers = ['x⁵', 'x⁴', 'x³', 'x²', 'x', ''];
            const key = labels[index] as keyof typeof coefficients;
            const powerLabel = powers[5 - degree + index];
            const label = `${key.toUpperCase()} (${powerLabel})`;

            return (
              <CoefficientInput
                key={key}
                label={label}
                value={coefficients[key]}
                onChange={value => updateCoefficient(key, value)}
              />
            );
          })}
        </View>

        <View style={styles.generatedEquationContainer}>
          <Text style={styles.generatedEquationText}>{equation}</Text>
        </View>

        {graphData.length > 0 && (
          <PolynomialChart data={graphData} equation={equation} />
        )}

        {solutions.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>Results</Text>
            <Text style={styles.resultsText}>{formatSolutions()}</Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.solveButton]}
            onPress={() => solve()}
          >
            <Text style={styles.solveButtonText}>Solve</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.clearButton]}
            onPress={clear}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// Los estilos permanecen igual que antes...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#006064',
  },
  equationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  equationText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
  },
  equationSubtext: {
    fontSize: 18,
    color: '#666',
    marginTop: 5,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 15,
  },
  configButton: {
    backgroundColor: '#00838f',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  configButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: '#b2ebf2',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#006064',
    textAlign: 'center',
  },
  degreeSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
    gap: 10,
  },
  degreeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#b2ebf2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  degreeButtonActive: {
    backgroundColor: '#006064',
  },
  degreeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#006064',
  },
  degreeButtonTextActive: {
    color: 'white',
  },
  coefficientsContainer: {
    marginBottom: 25,
  },
  generatedEquationContainer: {
    backgroundColor: '#006064',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  generatedEquationText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  resultsContainer: {
    backgroundColor: '#f1f8e9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#c5e1a5',
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#33691e',
    marginBottom: 10,
  },
  resultsText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  actionButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  solveButton: {
    backgroundColor: '#4caf50',
  },
  clearButton: {
    backgroundColor: '#f44336',
  },
  solveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OperationScreen;
