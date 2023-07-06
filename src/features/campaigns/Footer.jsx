import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { toggleEncountersMenu } from '../encounter/encountersSlice';

export default function Footer(){

  const dispatch = useDispatch()

  const handleEncounter = () => {
    dispatch(toggleEncountersMenu())
  }

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