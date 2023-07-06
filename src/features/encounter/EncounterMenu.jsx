import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { toggleEncountersMenu } from './encountersSlice';

export default function EncounterMenu({ navigation }) {

  const dispatch = useDispatch()

  const visible = useSelector(state => (state.encounters.showEncounterModal))
  const encounters = useSelector(state => (state.encounters.encounters))

  const handleClose = () => {
    dispatch(toggleEncountersMenu())
  }

  //TODO: have list items navigate to Encounter screen and load their respective encounters
  
  //TODO: make a "+" tile which navigates to the CampaignBuilder screen

  //TODO: styling: modal card should grow to 400px and scroll after that, should start at just the size of the tiles present

  return (
    <Modal isVisible={visible} avoidKeyboard={true} >
      <View style={styles.modalBg}>
        <View style={styles.modalBase}>
          <View style={styles.modalCard}>
            <ScrollView contentContainerStyle={styles.listContainer}>
              {!!encounters.length && encounters.map((encounter, index) => (
                <TouchableOpacity style={styles.encounter} key={`encounter${index}`} onPress={handleClose}>
                  <Text style={styles.text}>{encounter.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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