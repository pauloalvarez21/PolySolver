import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import AppNavigator from '../src/navigation/AppNavigator';

// --- MOCKS ---

// 1. Mock de las Pantallas (Screens)
// Reemplazamos las pantallas reales por vistas simples con un testID.
// Esto nos permite verificar fácilmente qué pantalla está activa.
jest.mock('../src/screens/HomeScreen', () => {
  const { View, Text } = require('react-native');
  return () => <View testID="home-screen"><Text>Home Screen</Text></View>;
});

jest.mock('../src/screens/OperationScreen', () => {
  const { View, Text } = require('react-native');
  return () => <View testID="operation-screen"><Text>Operation Screen</Text></View>;
});

jest.mock('../src/screens/InfoScreen', () => {
  const { View, Text } = require('react-native');
  return () => <View testID="info-screen"><Text>Info Screen</Text></View>;
});

// 2. Mock de Iconos
// Evitamos renderizar los iconos reales para simplificar la prueba.
jest.mock('../src/components/Icons', () => ({
  HomeIcon: () => <></>,
  SolveIcon: () => <></>,
  InfoIcon: () => <></>,
}));

// 3. Mock de Traducciones
jest.mock('../src/i18n/index', () => ({
  t: {
    navHome: 'Inicio',
    navOperation: 'Operar',
    navInfo: 'Info',
  },
}));

// 4. Mock de Safe Area (necesario para React Navigation en tests)
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaConsumer: jest.fn(({ children }) => children(inset)),
    useSafeAreaInsets: jest.fn(() => inset),
    SafeAreaInsetsContext: {
      Consumer: ({ children }: any) => children(inset),
      Provider: ({ children }: any) => children,
    },
  };
});

// 5. Mock de react-native-screens (necesario para React Navigation)
jest.mock('react-native-screens', () => {
  const { View } = require('react-native');
  return {
    enableScreens: jest.fn(),
    screensEnabled: jest.fn(() => true),
    Screen: View,
    ScreenContainer: View,
  };
});

describe('AppNavigator Component', () => {
  it('renders the bottom tab navigator with correct tabs', () => {
    render(<AppNavigator />);

    // Verificamos que los textos de las pestañas (Tabs) estén visibles
    expect(screen.getByText('Inicio')).toBeVisible();
    expect(screen.getByText('Operar')).toBeVisible();
    expect(screen.getByText('Info')).toBeVisible();
  });

  it('renders Home screen by default', () => {
    render(<AppNavigator />);
    // Verificamos que la pantalla inicial sea Home (usando el mock que creamos)
    expect(screen.getByTestId('home-screen')).toBeVisible();
  });

  it('navigates to Operation screen when tab is pressed', async () => {
    render(<AppNavigator />);

    // Buscamos el botón de la pestaña "Operar" y lo presionamos
    const operationTab = screen.getByText('Operar');
    fireEvent.press(operationTab);

    // Verificamos que la pantalla de Operación aparezca
    // Usamos findByTestId porque la navegación es una acción asíncrona
    const operationScreen = await screen.findByTestId('operation-screen');
    expect(operationScreen).toBeVisible();
  });

  it('navigates to Info screen when tab is pressed', async () => {
    render(<AppNavigator />);

    // Buscamos el botón de la pestaña "Info" y lo presionamos
    const infoTab = screen.getByText('Info');
    fireEvent.press(infoTab);

    // Verificamos que la pantalla de Info aparezca
    const infoScreen = await screen.findByTestId('info-screen');
    expect(infoScreen).toBeVisible();
  });
});