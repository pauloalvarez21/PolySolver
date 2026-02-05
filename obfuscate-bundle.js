#!/usr/bin/env node
/**
 * @file obfuscate-bundle.js
 * @description Script para ofuscar el bundle de producción de React Native.
 * Este script genera el bundle de JS y luego lo ofusca para máxima seguridad.
 */

const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const APP_NAME = 'PolySolver'; // Nombre correcto de la aplicación
// Detectar plataforma (por defecto android, usar 'ios' como argumento para cambiar)
const platform = process.argv.includes('ios') ? 'ios' : 'android';

// Configuración de rutas
const BUNDLE_PATH =
  platform === 'android'
    ? path.join(__dirname, 'android/app/src/main/assets/index.android.bundle')
    : path.join(__dirname, 'ios/main.jsbundle');

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
    console.log('✅ Bundle ofuscado generado exitosamente.');
    console.log('🚀 Iniciando compilación de APK y AAB para Android...');

    const androidDir = path.join(__dirname, 'android');
    const gradlew = process.platform === 'win32' ? 'gradlew.bat' : './gradlew';

    try {
      // Limpiar build anterior para evitar caché
      console.log('🧹 Ejecutando gradlew clean...');
      execSync(`${gradlew} clean`, { cwd: androidDir, stdio: 'inherit' });

      // Compilar APK
      console.log('🔨 Compilando APK (assembleRelease)...');
      execSync(`${gradlew} assembleRelease`, {
        cwd: androidDir,
        stdio: 'inherit',
      });

      // Compilar AAB
      console.log('📦 Compilando AAB (bundleRelease)...');
      execSync(`${gradlew} bundleRelease`, {
        cwd: androidDir,
        stdio: 'inherit',
      });

      console.log('\n✅ ¡Compilación Android completada!');
      console.log(
        '📂 APK: android/app/build/outputs/apk/release/app-release.apk',
      );
      console.log(
        '📂 AAB: android/app/build/outputs/bundle/release/app-release.aab',
      );
    } catch (error) {
      console.error(
        '❌ Error durante la compilación de Android:',
        error.message,
      );
      process.exit(1);
    }
  } else {
    console.log('✅ ¡Bundle ofuscado generado en ios/main.jsbundle!');

    // Verificación del sistema para compilación de IPA
    if (process.platform === 'darwin') {
      console.log(
        `🍎 Sistema macOS detectado. Intentando compilar IPA para ${APP_NAME}...`,
      );
      try {
        const iosDir = path.join(__dirname, 'ios');
        const workspace = `${APP_NAME}.xcworkspace`;
        const archivePath = path.join(iosDir, `build/${APP_NAME}.xcarchive`);

        console.log('🏗️  Generando archivo (Archive) con xcodebuild...');
        // Nota: Esto genera el .xcarchive. Para el .ipa final se requiere exportación con firma.
        execSync(
          `xcodebuild -workspace "${workspace}" -scheme "${APP_NAME}" -sdk iphoneos -configuration Release archive -archivePath "${archivePath}"`,
          { cwd: iosDir, stdio: 'inherit' },
        );

        console.log(`✅ Archive generado exitosamente en: ${archivePath}`);
        console.log(
          'ℹ️  Usa Xcode o xcodebuild -exportArchive para generar el archivo .ipa final.',
        );
      } catch (error) {
        console.error(
          '❌ Error al intentar compilar el proyecto iOS:',
          error.message,
        );
      }
    } else {
      console.log('💻 No estás en macOS. Se omite la compilación del IPA.');
      console.log(
        'ℹ️  Lleva el archivo ios/main.jsbundle a un Mac para compilar la app.',
      );
    }
  }
}

run();
