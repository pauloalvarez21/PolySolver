import React from 'react';
import { render, screen } from '@testing-library/react-native';
import PolynomialChart from '../src/components/PolynomialChart';

// --- MOCKS ---
// Mock de react-native-chart-kit para evitar renderizar SVG complejos en el test
jest.mock('react-native-chart-kit', () => ({
  LineChart: () => {
    const { View } = require('react-native');
    return <View testID="mock-line-chart" />;
  },
}));

// Mock de i18n
jest.mock('../src/i18n/index', () => ({
  t: {
    chartTitle: 'Título del Gráfico',
  },
}));

describe('PolynomialChart Component', () => {
  const mockData = [
    { x: 1, y: 1 },
    { x: 2, y: 4 },
    { x: 3, y: 9 },
  ];
  const mockEquation = 'x^2 = 0';

  it('renders correctly when data is provided', () => {
    render(<PolynomialChart data={mockData} equation={mockEquation} />);

    expect(screen.getByText('Título del Gráfico')).toBeVisible();
    // El componente elimina el " = 0" de la ecuación para la leyenda
    expect(screen.getByText('f(x) = x^2')).toBeVisible();
    expect(screen.getByTestId('mock-line-chart')).toBeVisible();
  });

  it('renders nothing when data is empty', () => {
    const { toJSON } = render(<PolynomialChart data={[]} equation={mockEquation} />);
    expect(toJSON()).toBeNull();
  });
});