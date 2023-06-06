import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screens/Home';
import Spells from './src/screens/Spells'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen
          name="Home"
          component={Home}
          />
          <Stack.Screen
          name="Spells"
          component={Spells}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}


