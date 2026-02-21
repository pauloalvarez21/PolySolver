import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { t } from '../i18n';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.footer}>
      {/* 
        Se corrige el reemplazo del año. 
        El placeholder en el archivo de traducción es {{year}}.
      */}
      <Text style={styles.footerText}>
        {t.homeFooterRights.replace('{{year}}', currentYear.toString())}
      </Text>
      <Text style={styles.footerSubtext}>{t.homeFooterTool}</Text>
      <Text style={styles.footerVersion}>{t.homeFooterVersion}</Text>
      <Image
        // NOTA: La carpeta se llama 'assests'. Si es un error y debería ser 'assets',
        // por favor, corrige la ruta aquí.
        source={require('../assests/images/gaelectronica.png')}
        style={styles.footerLogo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 40,
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#b2ebf2',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
  },
  footerVersion: {
    fontSize: 10,
    color: '#BBB',
    textAlign: 'center',
    fontFamily: 'Inter-Regular',
  },
  footerLogo: {
    width: 150,
    height: 150,
    marginTop: 16,
    resizeMode: 'contain',
    borderRadius: 30,
  },
});

export default Footer;