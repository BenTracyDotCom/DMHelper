import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Note from './Note';

export default function Notes() {

  const notes = useSelector(state => state.notes.current)

  return (
    <View className="bg-white rounded-xl mr-2 ">
      {notes.map((note, index) => (
       <Note note={note} key={index} />
      ))}
    </View>
  )
}