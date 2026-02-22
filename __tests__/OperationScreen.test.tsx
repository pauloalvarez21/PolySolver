import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import OperationScreen from '../src/screens/OperationScreen';
import usePolynomialSolver from '../src/hooks/usePolynomialSolver';

// --- MOCKS ---

// 1. Mock del Hook usePolynomialSolver
// Esto es crucial: no queremos probar la lógica matemática aquí (ya lo hicimos en otro test),
// sino cómo la pantalla reacciona a los datos que le da el hook.
jest.mock('../src/hooks/usePolynomialSolver');

// 2. Mock de Componentes Hijos
// Mockeamos CoefficientInput para poder interactuar con él fácilmente en la prueba.
// Lo reemplazamos por un TextInput simple con un testID predecible.
jest.mock('../src/components/CoefficientInput', () => {
  const { TextInput } = require('react-native');
  return ({ label, value, onChange }: any) => (
    <TextInput
      testID={`input-${label}`}
      value={value}
      onChangeText={onChange}
      placeholder={label}
    />
  );
});

// Mockeamos el gráfico para evitar errores de renderizado de SVG/Canvas en tests
jest.mock('../src/components/PolynomialChart', () => {
  const { View } = require('react-native');
  return () => <View testID="polynomial-chart" />;
});

jest.mock('../src/components/Footer', () => {
  const { View } = require('react-native');
  return () => <View testID="mock-footer" />;
});

// 3. Mock de Google Ads
jest.mock('react-native-google-mobile-ads', () => ({
  BannerAd: () => <></>,
  BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER' },
  TestIds: { ADAPTIVE_BANNER: 'test-id' },
  useForeground: jest.fn(),
}));

// 4. Mock de Traducciones
jest.mock('../src/i18n/index', () => ({
  t: {
    appTitle: 'PolySolver',
    calculateRoots: 'Calcular Raíces',
    settings: 'Configuración',
    equationDegree: 'Grado de la ecuación',
    results: 'Resultados',
    solve: 'Resolver',
    clear: 'Limpiar',
  },
}));

describe('OperationScreen Component', () => {
  // Definimos las funciones espía (spies) para verificar si se llaman
  const mockSetDegree = jest.fn();
  const mockUpdateCoefficient = jest.fn();
  const mockSolve = jest.fn();
  const mockClear = jest.fn();
  const mockFormatSolutions = jest.fn();

  // Estado inicial por defecto que devolverá nuestro hook simulado
  const defaultHookValues = {
    degree: 2,
    setDegree: mockSetDegree,
    coefficients: { a: '1', b: '2', c: '1', d: '0', e: '0', f: '0' },
    updateCoefficient: mockUpdateCoefficient,
    equation: 'x² + 2x + 1 = 0',
    solutions: [],
    graphData: [],
    error: '',
    solve: mockSolve,
    clear: mockClear,
    formatSolutions: mockFormatSolutions,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Configuramos el mock para que devuelva los valores por defecto antes de cada test
    (usePolynomialSolver as jest.Mock).mockReturnValue(defaultHookValues);
  });

  it('renders correctly with default values', () => {
    render(<OperationScreen />);

    expect(screen.getByText('PolySolver')).toBeVisible();
    expect(screen.getByText('Grado de la ecuación')).toBeVisible();
    expect(screen.getByText('x² + 2x + 1 = 0')).toBeVisible();
    expect(screen.getByText('Resolver')).toBeVisible();
  });

  it('changes degree when a degree button is pressed', () => {
    render(<OperationScreen />);
    const degree3Button = screen.getByText('3');
    fireEvent.press(degree3Button);
    expect(mockSetDegree).toHaveBeenCalledWith(3);
  });

  it('calls updateCoefficient when input text changes', () => {
    render(<OperationScreen />);
    // Buscamos el input para 'a'. Según tu lógica para grado 2, la etiqueta es "A (x²)"
    const inputA = screen.getByTestId('input-A (x²)');
    fireEvent.changeText(inputA, '5');
    expect(mockUpdateCoefficient).toHaveBeenCalledWith('a', '5');
  });

  it('calls solve function when Solve button is pressed', () => {
    render(<OperationScreen />);
    const solveButton = screen.getByText('Resolver');
    fireEvent.press(solveButton);
    expect(mockSolve).toHaveBeenCalled();
  });

  it('displays results and chart when solutions are present', () => {
    // Sobrescribimos el mock para este test específico simulando que el hook devolvió resultados
    (usePolynomialSolver as jest.Mock).mockReturnValue({
      ...defaultHookValues,
      solutions: [{ real: -1, imag: 0, isComplex: false }], // Hay soluciones
      graphData: [{ x: 1, y: 1 }], // Hay datos para el gráfico
      formatSolutions: () => 'x = -1', // Simulamos el texto de respuesta
    });

    render(<OperationScreen />);

    expect(screen.getByText('Resultados')).toBeVisible();
    expect(screen.getByText('x = -1')).toBeVisible();
    expect(screen.getByTestId('polynomial-chart')).toBeVisible();
  });
});