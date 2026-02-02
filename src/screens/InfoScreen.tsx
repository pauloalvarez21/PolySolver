import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native';
import { t } from '../i18n/index';

const InfoScreen = () => {
  const openWikipedia = () => {
    Linking.openURL('https://es.wikipedia.org/wiki/Ecuaci%C3%B3n');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t.navInfo}</Text>
        <Text style={styles.subtitle}>{t.infoSubtitle}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.whatAreEquations}</Text>
          <Text style={styles.cardText}>
            {t.equationsDesc}
          </Text>
        </View>

        <View style={[styles.card, styles.historyCard]}>
          <Text style={styles.cardTitle}>{t.whyCreated}</Text>
          <Text style={styles.cardText}>
            {t.whyCreatedDesc}
          </Text>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{t.bullet1}</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{t.bullet2}</Text>
          </View>
          <View style={styles.bulletPoint}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.bulletText}>{t.bullet3}</Text>
          </View>
          <Text style={[styles.cardText, { marginTop: 10 }]}>
            {t.historyDesc}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.knowMore}</Text>
          <Text style={styles.cardText}>
            {t.knowMoreDesc}
          </Text>
          <TouchableOpacity 
            style={styles.wikiButton}
            onPress={openWikipedia}
          >
            <Text style={styles.wikiButtonText}>{t.viewWiki}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>{t.quote}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{t.homeFooterRights}</Text>
          <Text style={styles.footerSubtext}>{t.homeFooterTool}</Text>
          <Text style={styles.footerVersion}>{t.homeFooterVersion}</Text>
          <Image
            source={require('../assests/images/gaelectronica.png')}
            style={styles.footerLogo}
          />
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 42,
    fontFamily: 'ChowFun-Regular',
    textAlign: 'center',
    color: '#006064',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'ChowFun-Regular',
    textAlign: 'center',
    color: '#0097a7',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#b2ebf2',
  },
  historyCard: {
    borderColor: '#00838f',
    borderRightWidth: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontFamily: 'ChowFun-Regular',
    color: '#006064',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 18,
    color: '#0097a7',
    marginRight: 10,
    fontWeight: 'bold',
  },
  bulletText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  wikiButton: {
    backgroundColor: '#00838f',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 15,
    elevation: 3,
  },
  wikiButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quoteContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  quoteText: {
    fontSize: 14,
    color: '#006064',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 20,
    opacity: 0.8,
  },
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
    fontFamily: 'ChowFun-Regular',
  },
  footerSubtext: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginBottom: 4,
    fontFamily: 'ChowFun-Regular',
  },
  footerVersion: {
    fontSize: 10,
    color: '#AAA',
    textAlign: 'center',
    fontFamily: 'ChowFun-Regular',
  },
  footerLogo: {
    width: 120,
    height: 120,
    marginTop: 15,
    resizeMode: 'contain',
  },
  bottomSpacer: {
    height: 20,
  },
});

export default InfoScreen;
