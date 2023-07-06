import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { toggleAddCharacter } from './newCampaignSlice';

export default function NewCharacterModal() {

  const dispatch = useDispatch()

  const addCharacterVisible = useSelector(state => (state.newCampaign.addCharacter))

  return (
    <Modal visible={addCharacterVisible}>
      <View>
       <TouchableOpacity onPress={() => {dispatch(toggleAddCharacter())}}>
         <Text>Add a character</Text>
       </TouchableOpacity>
      </View>
    </Modal>
  )
}