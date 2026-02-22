import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import InfoScreen from '../src/screens/InfoScreen';

// --- MOCKS ---

// 1. Mock de Google Mobile Ads
jest.mock('react-native-google-mobile-ads', () => ({
  BannerAd: () => <></>,
  BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER' },
  TestIds: { ADAPTIVE_BANNER: 'test-id' },
  useForeground: jest.fn(),
}));

// 2. Mock de i18n (Traducciones)
// Definimos todas las claves que usa InfoScreen para evitar errores de renderizado.
jest.mock('../src/i18n/index', () => ({
  t: {
    navInfo: 'Información',
    infoSubtitle: 'Subtítulo',
    whatAreEquations: '¿Qué son?',
    equationsDesc: 'Descripción ecuaciones',
    whyCreated: '¿Por qué?',
    whyCreatedDesc: 'Descripción creación',
    bullet1: 'Punto 1',
    bullet2: 'Punto 2',
    bullet3: 'Punto 3',
    historyDesc: 'Historia',
    knowMore: 'Saber más',
    knowMoreDesc: 'Descripción saber más',
    viewWiki: 'Ver Wikipedia',
    quote: 'Cita inspiradora',
  },
}));

// 3. Mock de Footer
jest.mock('../src/components/Footer', () => {
  const { View } = require('react-native');
  return () => <View testID="mock-footer" />;
});

describe('InfoScreen Component', () => {
  it('renders correctly all text sections', () => {
    render(<InfoScreen />);

    // Verificamos que los textos principales estén visibles
    expect(screen.getByText('Información')).toBeVisible();
    expect(screen.getByText('¿Qué son?')).toBeVisible();
    expect(screen.getByText('Descripción ecuaciones')).toBeVisible();
    expect(screen.getByText('Punto 1')).toBeVisible();
    expect(screen.getByText('Cita inspiradora')).toBeVisible();
    
    // Verificamos que el footer esté presente
    expect(screen.getByTestId('mock-footer')).toBeVisible();
  });

  it('opens Wikipedia link when button is pressed', async () => {
    // ARRANGE: Espiamos la función Linking.openURL
    const openURLSpy = jest.spyOn(Linking, 'openURL').mockImplementation(() => Promise.resolve(true));

    render(<InfoScreen />);

    // ACT: Buscamos el botón y lo presionamos
    const wikiButton = screen.getByText('Ver Wikipedia');
    fireEvent.press(wikiButton);

    // ASSERT: Verificamos que se haya llamado a la URL correcta
    expect(openURLSpy).toHaveBeenCalledWith('https://es.wikipedia.org/wiki/Ecuaci%C3%B3n');

    // Limpieza: Restauramos el mock original
    openURLSpy.mockRestore();
  });
});