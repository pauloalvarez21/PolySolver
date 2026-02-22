import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

// --- MOCKS ---

// 1. Mock de Navegación
// Necesitamos espiar la función 'navigate' para saber si fue llamada.
const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

// 2. Mock de Google Mobile Ads
// Esta librería usa código nativo, así que debemos simularla completamente para que Jest no falle.
jest.mock('react-native-google-mobile-ads', () => ({
  BannerAd: () => <></>, // Renderiza un fragmento vacío en lugar del anuncio
  BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER' },
  TestIds: { ADAPTIVE_BANNER: 'test-id' },
  useForeground: jest.fn(), // Mock del hook
}));

// 3. Mock de i18n (Traducciones)
jest.mock('../src/i18n/index', () => ({
  t: {
    appTitle: 'PolySolver',
    startSolving: 'Empezar a Resolver',
    howItWorks: '¿Cómo funciona?',
    // Agregamos las claves faltantes que usa el componente
    homeSubtitle: 'Subtítulo de prueba',
    howItWorksDesc: 'Descripción de prueba',
    step1: 'Paso 1',
    step2: 'Paso 2',
    step3: 'Paso 3',
    whatIsGraph: '¿Qué es el gráfico?',
    whatIsGraphDesc: 'Descripción del gráfico',
    whatIsItFor: '¿Para qué sirve?',
    // Estas son CRÍTICAS porque el código hace .split(':') sobre ellas
    graphBenefit1: 'Beneficio 1: Descripción',
    graphBenefit2: 'Beneficio 2: Descripción',
    graphBenefit3: 'Beneficio 3: Descripción',
  },
}));

// 4. Mock de Componentes Hijos
// Mockeamos el Footer para no probarlo aquí, ya que es un componente separado.
jest.mock('../src/components/Footer', () => {
  const {View} = require('react-native');
  return () => <View testID="mock-footer" />;
});

describe('HomeScreen Component', () => {
  // Limpiamos los mocks antes de cada prueba para que el contador de llamadas empiece en 0
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders correctly', () => {
    render(<HomeScreen />);

    // Verificamos que el título y el botón estén visibles
    expect(screen.getByText('PolySolver')).toBeVisible();
    expect(screen.getByText('Empezar a Resolver')).toBeVisible();
  });

  it('navigates to Operation screen when start button is pressed', () => {
    render(<HomeScreen />);

    // 1. Buscamos el botón por su texto
    const button = screen.getByText('Empezar a Resolver');

    // 2. Simulamos que el usuario lo presiona
    fireEvent.press(button);

    // 3. Verificamos que la función de navegación fue llamada con el destino correcto
    expect(mockNavigate).toHaveBeenCalledWith('Operation');
  });
});