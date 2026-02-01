import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* REVISA: Asegúrate de que el nombre del archivo coincida con el que tienes en assets/images */}
      <Image
        source={require('../assests/images/PolySolver.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>PolySolver</Text>

      <ActivityIndicator size="large" color="tomato" style={styles.loader} />
      <Text style={styles.loadingText}>Cargando componentes...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 48,
  },
  loader: {
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
});

export default SplashScreen;
