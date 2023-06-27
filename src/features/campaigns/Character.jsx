import { View, Text, TouchableOpacity } from 'react-native';

export default function Character({ character }) {

  return (
    <View>
      <Text>{character.name}</Text>
    </View>
  )
}