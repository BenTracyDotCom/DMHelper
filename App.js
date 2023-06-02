import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Home from './src/screens/Home';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}


