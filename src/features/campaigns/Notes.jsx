import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Note from './Note';

export default function Notes() {

  const notes = useSelector(state => state.notes.current)

  return (
    <View style={styles.notes}>
      {notes.map((note, index) => (
       <Note note={note} key={index} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  notes: {
    borderRadius: 12,
    paddingTop: 4,
    paddingHorizontal: 4
  }
})