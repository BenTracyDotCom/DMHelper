import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { toggleNoteModal } from './notesSlice';

export default function AddNote() {

  const dispatch = useDispatch()
  const visible = useSelector(state => state.notes.showAddNoteModal)

  return(
      <Modal isVisible={!visible}>
        <View style={{flex: 1}}>
          <Text>Putcha note heeeeeah</Text>
          <View>
            <TouchableOpacity onPress={() => {dispatch(toggleNoteModal())}}>
              <Text>✓</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
  )
}
