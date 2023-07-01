import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Note from './Note';

export default function Notes() {

  const notes = useSelector(state => state.notes.current)

  const handleAddNote = () => {
    //TODO, popup a text input modal to add a note to active notepad
  }

  return (
    <View style={styles.notes}>
      {notes.map((note, index) => (
       <Note note={note} key={index} />
      ))}
      <View style={styles.buttonHolder}>
        <TouchableOpacity style={styles.addNote} onPress={handleAddNote}>
          <Text>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  notes: {
    borderRadius: 12,
    paddingTop: 4,
    paddingHorizontal: 4
  },
  buttonHolder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8
  },
  addNote: {
    borderRadius: 30,
    alignItems: 'center',
    fontFamily: 'Scada',
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor: '#e5e7eb'
  }
})