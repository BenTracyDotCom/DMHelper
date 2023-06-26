import { Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { modalToggled, titleAdded, characterAdded, characterRemoved, mainQuestAdded, mainQuestRemoved, firstQuestAdded } from './newCampaignSlice'

export default function NewCampaign() {

    const dispatch = useDispatch()
    const newCampaign = useSelector(state => state.newCampaign)

    const handleTitle = (text) => {
      dispatch(titleAdded(text))
    }


    return (
        <Modal
            animationType="slide"
            visible={newCampaign.shown}
            presentationStyle='pageSheet'
            >
            <Text className="w-11/12 h-11/12 m-auto">
                New campaign wooo
                {JSON.stringify(newCampaign)}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={handleTitle}
              value={newCampaign.title}
              />
            <TouchableOpacity onPress={() => {dispatch(modalToggled())}} className="m-auto">
                <Text className="text-blue-500">Click to close</Text>
            </TouchableOpacity>
        </Modal>)

}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
  }
})