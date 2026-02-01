import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Importamos las pantallas
import HomeScreen from '../screens/HomeScreen';
import OperationScreen from '../screens/OperationScreen';
import InfoScreen from '../screens/InfoScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = '';

            if (route.name === 'Home') iconName = '🏠';
            else if (route.name === 'Operation') iconName = '⚙️';
            else if (route.name === 'Info') iconName = 'ℹ️';

            return (
              <Text style={{ fontSize: size, color: color }}>{iconName}</Text>
            );
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Operation" component={OperationScreen} />
        <Tab.Screen name="Info" component={InfoScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
