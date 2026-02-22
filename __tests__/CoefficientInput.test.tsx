import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import CoefficientInput from '../src/components/CoefficientInput';

describe('CoefficientInput Component', () => {
  it('renders correctly with label and value', () => {
    const mockOnChange = jest.fn();
    render(
      <CoefficientInput
        label="A (x²)"
        value="5"
        onChange={mockOnChange}
      />
    );

    // Verificamos que la etiqueta y el valor se muestren
    expect(screen.getByText('A (x²)')).toBeVisible();
    expect(screen.getByDisplayValue('5')).toBeVisible();
    // Verificamos que el texto de ayuda esté presente
    expect(screen.getByText('Floating-point')).toBeVisible();
  });

  it('calls onChange when text changes', () => {
    const mockOnChange = jest.fn();
    render(
      <CoefficientInput
        label="B"
        value=""
        onChange={mockOnChange}
      />
    );

    // Buscamos el input (usando el placeholder por defecto '0') y simulamos escritura
    const input = screen.getByPlaceholderText('0');
    fireEvent.changeText(input, '10');

    // Verificamos que la función padre haya recibido el nuevo valor
    expect(mockOnChange).toHaveBeenCalledWith('10');
  });
});