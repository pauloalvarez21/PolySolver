module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    // Maneja las importaciones de assets (imágenes, fuentes, etc.)
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  transformIgnorePatterns: [
    // Permite la transformación de librerías comunes de React Native
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation)',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/styles.ts', // Opcional: si quieres ignorar archivos solo de estilos
  ],
  coveragePathIgnorePatterns: [
    'src/i18n/index.ts', // Ignoramos archivos de traducción o configuración pura si lo deseas
  ],
};
