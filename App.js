import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useFonts } from 'expo-font';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Launch from './src/screens/Launch';
import Home from './src/screens/Home';
import Spells from './src/screens/Spells';
import Spell from './src/screens/Spell';
import Encounter from './src/screens/Encounter';

import Monsters from './src/screens/Monsters.jsx'
import Monster from './src/screens/Monster.jsx'
import Debug from './src/screens/Debug';

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Scada': require('./assets/fonts/ScadaRegular400.ttf'),
    'Scada-Italic': require('./assets/fonts/ScadaItalic400.ttf'),
    'Scada-Bold': require('./assets/fonts/ScadaBold700.ttf'),
    'Scada-Bold-Italic': require('./assets/fonts/ScadaBoldItalic700.ttf')
  })

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
            name="Monsters"
            component={Monsters}
          />
          <Stack.Screen
            name="Monster"
            component={Monster}
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


