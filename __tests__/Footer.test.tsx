import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Footer from '../src/components/Footer';

// Mock de i18n para controlar los textos
jest.mock('../src/i18n/index', () => ({
  t: {
    homeFooterRights: 'Derechos reservados {{year}}',
    homeFooterTool: 'Herramienta de prueba',
    homeFooterVersion: 'vTest',
  },
}));

describe('Footer Component', () => {
  it('renders correctly with the current year', () => {
    render(<Footer />);

    const currentYear = new Date().getFullYear();

    // Verificamos que el año se haya insertado correctamente en el texto
    expect(screen.getByText(`Derechos reservados ${currentYear}`)).toBeVisible();
    expect(screen.getByText('Herramienta de prueba')).toBeVisible();
    expect(screen.getByText('vTest')).toBeVisible();
  });
});