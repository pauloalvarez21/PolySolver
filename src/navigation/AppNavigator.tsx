import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { t } from '../i18n/index';

// Importamos las pantallas
import HomeScreen from '../screens/HomeScreen';
import OperationScreen from '../screens/OperationScreen';
import InfoScreen from '../screens/InfoScreen';

const Tab = createBottomTabNavigator();

import { HomeIcon, SolveIcon, InfoIcon } from '../components/Icons';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const iconSize = focused ? size + 4 : size;
            
            if (route.name === 'Home') return <HomeIcon color={color} size={iconSize} />;
            if (route.name === 'Operation') return <SolveIcon color={color} size={iconSize} />;
            if (route.name === 'Info') return <InfoIcon color={color} size={iconSize} />;
            
            return null;
          },
          tabBarActiveTintColor: '#006064',
          tabBarInactiveTintColor: '#b2ebf2',
          tabBarStyle: {
            height: 65,
            paddingBottom: 10,
            paddingTop: 5,
            backgroundColor: 'white',
            borderTopWidth: 1,
            borderTopColor: '#e0f7fa',
          }
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: t.navHome }} 
        />
        <Tab.Screen 
          name="Operation" 
          component={OperationScreen} 
          options={{ title: t.navOperation }} 
        />
        <Tab.Screen 
          name="Info" 
          component={InfoScreen} 
          options={{ title: t.navInfo }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
