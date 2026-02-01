/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react';

// Importamos componentes
import SplashScreen from './src/screens/SplashScreen';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulamos la carga de componentes o petición de datos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Espera 3 segundos

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return <AppNavigator />;
}

export default App;
