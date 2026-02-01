/**
 * @file obfuscate-bundle.js
 * @description Script para ofuscar el bundle de producción de React Native.
 * Este script genera el bundle de JS y luego lo ofusca para máxima seguridad.
 */

const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Detectar plataforma (por defecto android, usar 'ios' como argumento para cambiar)
const platform = process.argv.includes('ios') ? 'ios' : 'android';

// Configuración de rutas
const BUNDLE_PATH =
  platform === 'android'
    ? path.join(
        __dirname,
        '../android/app/src/main/assets/index.android.bundle',
      )
    : path.join(__dirname, '../ios/main.jsbundle');

const ASSETS_DEST = platform === 'android' ? 'android/app/src/main/res' : 'ios';

async function run() {
  console.log(
    `🚀 Iniciando proceso de ofuscación para ${platform.toUpperCase()}...`,
  );

  // 1. Asegurar que existe el directorio del bundle
  const bundleDir = path.dirname(BUNDLE_PATH);
  if (!fs.existsSync(bundleDir)) {
    fs.mkdirSync(bundleDir, { recursive: true });
  }

  // 2. Generar el bundle de React Native (esto junta todo tu código en un archivo)
  console.log('📦 Generando bundle de JavaScript...');
  try {
    execSync(
      `npx react-native bundle --platform ${platform} --dev false --entry-file index.js --bundle-output ${BUNDLE_PATH} --assets-dest ${ASSETS_DEST}`,
      { stdio: 'inherit' },
    );
  } catch (error) {
    console.error('❌ Error al generar el bundle:', error);
    process.exit(1);
  }

  // 3. Leer el bundle generado
  console.log('🔍 Leyendo bundle original...');
  const bundleCode = fs.readFileSync(BUNDLE_PATH, 'utf8');

  // 4. Ofuscar el código
  console.log(
    '🛡️  Ofuscando código (esto puede tardar un poco dependiendo del tamaño)...',
  );
  const obfuscatedResult = JavaScriptObfuscator.obfuscate(bundleCode, {
    compact: true,
    controlFlowFlattening: true, // Hace el flujo de código ilegible
    controlFlowFlatteningThreshold: 0.75,
    numbersToExpressions: true,
    simplify: true,
    stringArray: true,
    stringArrayEncoding: ['base64'], // Encripta strings en base64
    stringArrayThreshold: 0.75,
    unicodeEscapeSequence: false,
  });

  // 5. Sobrescribir el bundle con la versión ofuscada
  console.log('💾 Guardando bundle ofuscado...');
  fs.writeFileSync(BUNDLE_PATH, obfuscatedResult.getObfuscatedCode());

  if (platform === 'android') {
    console.log(
      '✅ ¡Proceso completado con éxito! Ahora puedes compilar tu APK de release.',
    );
  } else {
    console.log('✅ ¡Bundle ofuscado generado en ios/main.jsbundle!');
    console.log('\n⚠️  INSTRUCCIONES PARA IOS:');
    console.log(
      '   Para que Xcode use este archivo en lugar de generar uno nuevo (y sin ofuscar) al compilar,',
    );
    console.log(
      '   debes asegurarte de que tu proyecto de Xcode esté configurado para usar el bundle offline',
    );
    console.log(
      '   ("offline bundle") o arrastrar manualmente este main.jsbundle a los recursos de Xcode.',
    );
  }
}

run();
