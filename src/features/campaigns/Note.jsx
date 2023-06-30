import { View, TouchableOpacity, Text } from 'react-native';

export default function Note({note}) {

  return (
    <View>
      <TouchableOpacity className="px-2 pt-2">
        <Text>{note}</Text>
      </TouchableOpacity>
    </View>
  )
}