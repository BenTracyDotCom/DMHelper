import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { modalToggled } from '../campaigns/newCampaignSlice';

export default function Note({note}) {

  const handleEdit = () => {

  }

  return (
    <View>
      <TouchableOpacity onPress={handleEdit}>
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