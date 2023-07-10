import { Modal, Text, TextInput, TouchableOpacity, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { modalToggled, titleAdded, toggleAddCharacter, characterAdded, characterRemoved, mainQuestAdded, mainQuestRemoved, firstQuestAdded } from './newCampaignSlice';
import NewCharacterModal from './NewCharacterModal';
import { useState } from 'react';
import { campaignAdded } from '../campaigns/campaignsSlice';

export default function NewCampaign() {

  const dispatch = useDispatch()
  const newCampaign = useSelector(state => state.newCampaign)

  const [location, setLocation] = useState('')
  const [hook, setHook] = useState('')
  const [objective, setObjective] = useState('')

  const handleTitle = (text) => {
    dispatch(titleAdded(text))
  }

  const handleCharacter = () => {
    dispatch(toggleAddCharacter())
  }

  const handleCancel = () => {
    dispatch(modalToggled())
  }

  const handleSubmit = () => {
    //TODO: call a function to save this to Realm and return stored object with ID
    dispatch(campaignAdded({
      ...newCampaign.campaign,
      quests: [hook],
      currentQuest: hook,
      location: location,
      notes: [],
      currentObjective: objective,
      activeNotes: null
    }))
    dispatch(modalToggled())
  }


  return (
    <Modal
      animationType="slide"
      visible={newCampaign.shown}
      presentationStyle='pageSheet'
    >
      <NewCharacterModal />
      <TextInput
        style={styles.input}
        onChangeText={handleTitle}
        value={newCampaign.name}
        placeholder={"Enter a name for your new campaign"}
      />
      {!!newCampaign.campaign.characters.length && newCampaign.campaign.characters.map((char, i) => (<TouchableOpacity key={i}>
        <Text>{char.name}</Text>
      </TouchableOpacity>))}
      <TouchableOpacity onPress={handleCharacter}>
        <Text>Add Character</Text>
      </TouchableOpacity>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>Location:</Text>
        <TextInput
          placeholder="Where is your party starting?"
          onChangeText={setLocation}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>First hook:</Text>
        <TextInput
          placeholder="E.g. 'Meet X in Y'"
          onChangeText={setHook}
        />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.inputLabel}>First objective:</Text>
        <TextInput
          placeholder="E.g. Travel to Y"
          onChangeText={setObjective}
        />
      </View>
      <TouchableOpacity onPress={handleCancel} className="m-auto">
        <Text className="text-red-500">Click to cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSubmit} className="m-auto">
        <Text className="text-blue-500">Save Campaign</Text>
      </TouchableOpacity>
    </Modal>)

}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    textAlign: "left"
  },
  impotRow: {
    flexDirection: 'row',
  },
  inputLabel: {
    fontFamily: 'Scada',
  }
})