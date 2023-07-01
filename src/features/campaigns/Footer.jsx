import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default function Footer(){

  return (
    <View style={styles.container}>
      <Text>Feet go here lol</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 150
  }
})