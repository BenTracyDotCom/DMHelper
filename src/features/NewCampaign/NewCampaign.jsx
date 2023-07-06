import { Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { modalToggled, titleAdded, toggleAddCharacter, characterAdded, characterRemoved, mainQuestAdded, mainQuestRemoved, firstQuestAdded } from './newCampaignSlice';
import NewCharacterModal from './NewCharacterModal';

export default function NewCampaign() {

  const dispatch = useDispatch()
  const newCampaign = useSelector(state => state.newCampaign)

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
    //TODO: make this validate inputs and add newCampaign to campaigns array
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
      <Text className="w-11/12 h-11/12 m-auto">
        All this page has to do is add a title for the campaign, some characters, the initial location, hook(broader, i.e. "Meet friend in Phandalin"), and objective(more molecular, i.e. 'escort cart to phandalin'). Encounters can be added in the actual campaign screen. Limit characters to what looks nice in those blocks bc no one wants to conditionally change text size on the campaign screen header.
      </Text>
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
  }
})