import React from 'react';
import { render } from '@testing-library/react-native';
import { HomeIcon, SolveIcon, InfoIcon } from '../src/components/Icons';

describe('Icons Components', () => {
  // Verificamos que cada icono se renderice sin lanzar errores
  it('renders HomeIcon', () => {
    const { toJSON } = render(<HomeIcon color="red" size={24} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders SolveIcon', () => {
    const { toJSON } = render(<SolveIcon color="blue" size={30} />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders InfoIcon', () => {
    const { toJSON } = render(<InfoIcon color="green" size={20} />);
    expect(toJSON()).toBeTruthy();
  });
});