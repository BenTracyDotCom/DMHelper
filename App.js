import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Launch from './src/screens/Launch';
import Home from './src/screens/Home';
import Spells from './src/screens/Spells';
import Spell from './src/screens/Spell';
import Encounter from './src/screens/Encounter';

import Debug from './src/screens/Debug';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Launch">
          <Stack.Screen
            name="Launch"
            component={Launch}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Spells"
            component={Spells}
          />
          <Stack.Screen
            name="Spell"
            component={Spell}
          />
          <Stack.Screen
          name="Encounter"
          component={Encounter}
          />
          <Stack.Screen
          name="Debug"
          component={Debug}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}


