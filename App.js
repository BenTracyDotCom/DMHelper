import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-red-500">It's working! It's workiiiing!</Text>
      <StatusBar style="auto" />
    </View>
  );
}


