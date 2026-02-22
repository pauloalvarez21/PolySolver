import React from 'react';
import {render, screen} from '@testing-library/react-native';
import SplashScreen from '../src/screens/SplashScreen';

// --- Mocks ---
// Simulamos el archivo de internacionalización (i18n).
// Esto asegura que la prueba no dependa de los textos reales, que podrían cambiar.
jest.mock('../src/i18n/index', () => ({
  t: {
    loadingComponents: 'Cargando componentes de prueba...',
  },
}));

describe('SplashScreen Component', () => {
  it('renders correctly elements', () => {
    // ARRANGE & ACT
    render(<SplashScreen />);

    // ASSERT
    // 1. Verificamos que el título de la App esté visible
    expect(screen.getByText('PolySolver')).toBeVisible();

    // 2. Verificamos que el texto de carga (que definimos en el mock arriba) esté visible
    expect(screen.getByText('Cargando componentes de prueba...')).toBeVisible();

    // 3. Verificamos que el indicador de actividad (spinner) esté presente
    // Usamos el testID que añadimos en el paso anterior
    expect(screen.getByTestId('loading-indicator')).toBeVisible();
  });
});