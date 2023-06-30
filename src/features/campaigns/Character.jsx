import { View, Text, TouchableOpacity } from 'react-native';

export default function Character({ character }) {

  return (
    <View>
      <TouchableOpacity>
        <Text>{character.name}</Text>
        <Text>{`${character.race} ${character.class} ${character.level}`}</Text>
      </TouchableOpacity>
    </View>
  )
}