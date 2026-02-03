import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from '../i18n/index';

const HomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{t.appTitle}</Text>
        <Text style={styles.subtitle}>{t.homeSubtitle}</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.howItWorks}</Text>
          <Text style={styles.cardText}>
            {t.howItWorksDesc}
          </Text>
          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}><Text style={styles.stepNumber}>1</Text></View>
            <Text style={styles.stepText}>{t.step1}</Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}><Text style={styles.stepNumber}>2</Text></View>
            <Text style={styles.stepText}>{t.step2}</Text>
          </View>
          <View style={styles.stepContainer}>
            <View style={styles.stepCircle}><Text style={styles.stepNumber}>3</Text></View>
            <Text style={styles.stepText}>{t.step3}</Text>
          </View>
        </View>

        <View style={[styles.card, styles.graphCard]}>
          <Text style={styles.cardTitle}>{t.whatIsGraph}</Text>
          <Text style={styles.cardText}>
            {t.whatIsGraphDesc}
          </Text>
          
          <View style={styles.divider} />

          <Text style={styles.cardTitle}>{t.whatIsItFor}</Text>
          <Text style={styles.cardText}>
            • <Text style={styles.bold}>{t.graphBenefit1.split(':')[0]}:</Text>{t.graphBenefit1.split(':')[1]}
          </Text>
          <Text style={styles.cardText}>
            • <Text style={styles.bold}>{t.graphBenefit2.split(':')[0]}:</Text>{t.graphBenefit2.split(':')[1]}
          </Text>
          <Text style={styles.cardText}>
            • <Text style={styles.bold}>{t.graphBenefit3.split(':')[0]}:</Text>{t.graphBenefit3.split(':')[1]}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.mainButton}
          onPress={() => navigation.navigate('Operation')}
        >
          <Text style={styles.mainButtonText}>{t.startSolving}</Text>
        </TouchableOpacity>

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
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
    color: '#006064',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
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
  graphCard: {
    borderColor: '#00838f',
    borderLeftWidth: 5,
  },
  cardTitle: {
    fontSize: 22,
    color: '#006064',
    fontFamily: 'Inter-Bold',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00838f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stepText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0f7fa',
    marginVertical: 15,
  },
  bold: {
    fontWeight: 'bold',
    color: '#006064',
  },
  mainButton: {
    backgroundColor: '#00838f',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  mainButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  bottomSpacer: {
    height: 20,
  },
});

export default HomeScreen;
