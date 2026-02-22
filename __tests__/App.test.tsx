import React from 'react';
import {render, screen, waitFor, act} from '@testing-library/react-native';
import App from '../App';

// --- Mocking de Componentes ---
// Para probar 'App' de forma aislada (prueba unitaria), no queremos renderizar
// sus componentes hijos reales ('SplashScreen' y 'AppNavigator').
// En su lugar, los "mockeamos" o suplantamos con componentes falsos y simples.
jest.mock('../src/screens/SplashScreen', () => {
  const {View} = require('react-native');
  // Este componente falso se renderizará en lugar del real.
  // Le añadimos un testID para poder encontrarlo fácilmente en la prueba.
  return () => <View testID="splash-screen" />;
});

jest.mock('../src/navigation/AppNavigator', () => {
  const {View} = require('react-native');
  // Hacemos lo mismo para el AppNavigator.
  return () => <View testID="app-navigator" />;
});

// Le decimos a Jest que queremos controlar el tiempo manualmente (setTimeout, etc.)
jest.useFakeTimers();

describe('App Component', () => {
  // Test 1: Verificar el estado inicial
  it('should render SplashScreen initially', () => {
    // ARRANGE & ACT: Renderizamos el componente App
    render(<App />);

    // ASSERT: Verificamos que el SplashScreen (nuestro mock) esté visible.
    // Usamos `getByTestId` para encontrar el componente por el ID que definimos en el mock.
    expect(screen.getByTestId('splash-screen')).toBeVisible();

    // También verificamos que el AppNavigator NO esté presente todavía.
    // `queryByTestId` es útil aquí porque devuelve `null` si no lo encuentra, en lugar de lanzar un error.
    expect(screen.queryByTestId('app-navigator')).toBeNull();
  });

  // Test 2: Verificar el estado después del temporizador
  it('should render AppNavigator after 3 seconds', async () => {
    // ARRANGE: Renderizamos el componente
    render(<App />);

    // Verificamos que inicialmente estamos en el estado correcto (con el SplashScreen)
    expect(screen.getByTestId('splash-screen')).toBeVisible();

    // ACT: Avanzamos el tiempo de Jest en 3000 milisegundos.
    // Esto ejecutará instantáneamente el código dentro de `setTimeout` en App.tsx.
    // Lo envolvemos en `act` para notificar a React que ocurrirá un cambio de estado.
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    // ASSERT: Verificamos el nuevo estado.
    // Usamos `waitFor` porque el cambio de estado en React es asíncrono.
    // `waitFor` esperará hasta que la aserción dentro de él sea verdadera.
    await waitFor(() => {
      // El AppNavigator ahora debería estar visible.
      expect(screen.getByTestId('app-navigator')).toBeVisible();
    });

    // Y el SplashScreen ya no debería existir en la pantalla.
    expect(screen.queryByTestId('splash-screen')).toBeNull();
  });
});