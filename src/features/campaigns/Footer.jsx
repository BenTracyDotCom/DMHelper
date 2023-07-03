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
      <TouchableOpacity style={styles.encounters} onPress={handleEncounter}>
        <Text style={styles.buttonText}>Encounters</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 150
  },
  encounters: {
    borderRadius: 12,
    backgroundColor: 'blue',
    marginHorizontal: 9,
    marginTop: 9,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Scada',
    padding: 8,
    textAlign: 'center',
    fontSize: 20
  }
})