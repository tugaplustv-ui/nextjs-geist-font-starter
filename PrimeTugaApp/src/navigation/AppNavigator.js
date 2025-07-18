import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import DetailsScreen from '../screens/DetailsScreen';
import themes from '../styles/themes';
import { SCREENS } from '../utils/constants';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themes.colors.cardBackground,
          borderBottomColor: themes.colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: themes.colors.text,
        headerTitleStyle: {
          ...themes.typography.header,
          color: themes.colors.text,
        },
        headerBackTitleVisible: false,
        cardStyle: {
          backgroundColor: themes.colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={BottomTabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name={SCREENS.DETAILS} 
        component={DetailsScreen} 
        options={({ route }) => ({
          title: route.params?.movie?.title || 'Detalhes',
          headerBackTitle: 'Voltar',
        })}
      />
    </Stack.Navigator>
  );
}
