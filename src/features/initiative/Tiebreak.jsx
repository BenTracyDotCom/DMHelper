import Modal from 'react-native-modal';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setInitiative, setAllEnemies, setEnemiesByType, toggleTiebreak } from '../encounter/encounterSlice';
import { useEffect } from 'react';

export default function Tiebreak({ navigation }) {
  const dispatch = useDispatch()
  const visible = useSelector(state => state.encounter.tiebreak)
  const { grouping, chars, ties, activeTie } = useSelector(state => state.encounter)

  const handleCancel = () => dispatch(toggleTiebreak())

  const insertChar = (name) => {
    //TODO: give the character an incrementing percentage of its initiative; i.e. first "17" will be "17.0", next will be "17.1", etc. and will be removed from "ties" list as this happens
  }

  useEffect(() => {console.log(ties[activeTie], 's/b array')}, [ties])

  return (
    <Modal isVisible={visible} avoidKeyboard={true} style={styles.modalBg}>
      <View style={styles.modalBase}>
        <View style={styles.modalCard}>
          <View style={styles.buttonbar}>
            {!!ties[activeTie] && ties[activeTie].map((char, i) => (
              <TouchableOpacity onPress={() => insertChar(char)}>
                <Text key={i}>{char.name}</Text>
              </TouchableOpacity>
            ))}
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