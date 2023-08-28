import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setInitiative, setAllEnemies, setEnemiesByType, toggleTiebreak } from '../encounter/encounterSlice';

export default function Tiebreak({ navigation }) {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.encounter.tiebreak)
  const { grouping, chars } = useSelector(state => state.encounter)

  const handleCancel = () => dispatch(toggleTiebreak())

  return (
    <Modal isVisible={visible} avoidKeyboard={true} style={styles.modalBg}>
      <View style={styles.modalBase}>
        <View style={styles.modalCard}>
          <TextInput style={styles.textInput} onChangeText={setText} value={text} multiline={true}/>
          <View style={styles.buttonbar}>
            <TouchableOpacity style={{ ...styles.button, backgroundColor: '#ef4444' }} onPress={handleCancel}>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBg: {
    //backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalBase: {
    backgroundColor: '#d1d5db',
    borderRadius: 12,
    width: 250,
    height: 400,
    marginHorizontal: 'auto',
  },
  modalCard: {
    // backgroundColor: 'green',
    margin: 8,
    height: 400,
    borderRadius: 10,
  },
  textInput: {
    height: 340,
    textAlignVertical: 'top',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  buttonbar: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#ef4444'
  }

})