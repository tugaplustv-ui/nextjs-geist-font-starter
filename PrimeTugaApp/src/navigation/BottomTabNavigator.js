import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import DownloadsScreen from '../screens/DownloadsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import themes from '../styles/themes';
import { SCREENS } from '../utils/constants';

const Tab = createBottomTabNavigator();

const TabLabel = ({ label, focused }) => (
  <Text style={[
    themes.typography.tabLabel,
    { 
      color: focused ? themes.colors.primary : themes.colors.textMuted,
      marginTop: 4,
    }
  ]}>
    {label}
  </Text>
);

const TabIcon = ({ icon, focused }) => (
  <View style={{
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  }}>
    <Text style={{
      fontSize: 20,
      color: focused ? themes.colors.primary : themes.colors.textMuted,
    }}>
      {icon}
    </Text>
  </View>
);

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: themes.colors.cardBackground,
          borderTopColor: themes.colors.border,
          borderTopWidth: 1,
          height: themes.dimensions.tabBar.height,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: themes.colors.primary,
        tabBarInactiveTintColor: themes.colors.textMuted,
      }}
    >
      <Tab.Screen
        name={SCREENS.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Início" focused={focused} />,
          tabBarIcon: ({ focused }) => <TabIcon icon="🏠" focused={focused} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.SEARCH}
        component={SearchScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Buscar" focused={focused} />,
          tabBarIcon: ({ focused }) => <TabIcon icon="🔍" focused={focused} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.DOWNLOADS}
        component={DownloadsScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Downloads" focused={focused} />,
          tabBarIcon: ({ focused }) => <TabIcon icon="📥" focused={focused} />,
        }}
      />
      <Tab.Screen
        name={SCREENS.PROFILE}
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Perfil" focused={focused} />,
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
