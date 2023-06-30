import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function Notes() {

  const notes = useSelector(state => (state.notes))

  return (
    <View>
      {notes.map((note, index) => (
       <Text key={index}>{note}</Text>
      ))}
    </View>
  )
}