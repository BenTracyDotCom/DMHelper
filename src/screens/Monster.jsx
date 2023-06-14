import { Text, View } from 'react-native';

export default function Monster({route}) {

  const {monster} = route.params
  return (
    <View>
      <Text>
        {monster}
      </Text>
    </View>
  )
}