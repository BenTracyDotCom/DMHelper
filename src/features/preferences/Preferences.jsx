import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { showPrefs } from "./preferencesSlice";
import { toggle20Mode, toggleNon20Mode, setDelay, setLast20, setLastNon20 } from "../dieroll/dierollSlice";
export default function Preferences() {

  const dispatch = useDispatch()
  const visible = useSelector(state => state.prefs.shown)
  const encounters = useSelector(state => state.encounters.encounters)
  const handleClose = () => {
    dispatch(showPrefs())
  }

  return(
      <Modal visible={visible} avoidKeyboard={true} >
      <View style={styles.modalBg}>
        <View style={styles.modalBase}>
          <View style={styles.modalCard}>
            <TouchableOpacity onPress={handleClose}>
              <Text>Prefs</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
        </Modal>
  )
}

const styles = StyleSheet.create({
  modalBg: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalBase: {
    backgroundColor: '#d1d5db',
    borderRadius: 12,
    width: 250,
    height: 400,
    marginHorizontal: 'auto',
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    maxHeight: 400,
    width: '90%',
  },
  listContainer: {
    flexGrow: 1
  },
  encounter: {
    backgroundColor: 'white',
    borderRadius: 12
  },
  text: {
    fontFamily: 'Scada',
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