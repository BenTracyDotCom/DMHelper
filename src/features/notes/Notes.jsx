import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Note from "./Note";
import { toggleNoteModal, setStale } from "./notesSlice";
import { useEffect } from "react";
import { setNotes } from "./notesSlice";

export default function Notes() {
  const notes = useSelector((state) => state.notes.current);
  const campaignNotes = useSelector((state) => state.campaign.notes);
  const active = useSelector((state) => state.campaign.activeNotes);

  const dispatch = useDispatch();

  const handleAddNote = () => {
    dispatch(toggleNoteModal());
  };

  useEffect(() => {
    dispatch(setNotes(campaignNotes));
  }, [campaignNotes]);

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
  );
}

const styles = StyleSheet.create({
  notes: {
    borderRadius: 12,
    paddingTop: 4,
    paddingHorizontal: 4,
  },
  buttonHolder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
  addNote: {
    borderRadius: 30,
    alignItems: "center",
    fontFamily: "Scada",
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    backgroundColor: "white",
  },
});
