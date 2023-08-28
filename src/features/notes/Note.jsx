import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleNoteModal } from "./notesSlice";
import { setStale } from "./notesSlice";

export default function Note({ note }) {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setStale(note));
    dispatch(toggleNoteModal());
  };

  return (
    <View>
      <TouchableOpacity onPress={handleEdit}>
        <Text style={styles.noteText}>{note}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {},
  noteText: {
    paddingHorizontal: 5,
  },
});
