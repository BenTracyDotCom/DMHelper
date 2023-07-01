import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Note({note}) {

  return (
    <View>
      <TouchableOpacity>
        <Text style={styles.noteText}>{note}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  noteCard: {

  },
  noteText: {
    paddingHorizontal: 5
  }
})