import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Modal from "react-native-modal";
import { toggleNoteModal, setStale } from "./notesSlice";
import {
  addNote,
  editNote,
  addCharNote,
  editCharNote,
  setActiveNotes,
} from "../campaigns/campaignSlice";
import { setNotes } from "./notesSlice";

export default function AddNote() {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.notes.showAddNoteModal);
  const old = useSelector((state) => state.notes.lastNote);
  const active = useSelector((state) => state.campaign.activeNotes);
  const charNotes = useSelector((state) => state.notes.current).slice(0);

  //TODO: make note text wrap instead of extend on textinput component

  const [text, setText] = useState(old);

  const handleSubmit = () => {
    if (active !== null) {
      if (old !== "") {
        const noteIndex = charNotes.findIndex((note) => note === old);
        dispatch(
          editCharNote({
            name: active.name,
            old: old,
            new: text,
          }),
        );
        setText("");
        dispatch(setStale(""));
        if (text) {
          charNotes.splice(noteIndex, 1, text);
        } else {
          charNotes.splice(noteIndex, 1);
        }
        dispatch(setNotes(charNotes));
        dispatch(setActiveNotes(active));
        dispatch(toggleNoteModal());
      } else {
        dispatch(
          addCharNote({
            name: active.name,
            note: text,
          }),
        );
        setText("");
        if (charNotes[0].slice(0, 8) === "No notes") {
          charNotes.splice(0, 1, text);
        } else {
          charNotes.push(text);
        }
        dispatch(setNotes(charNotes));
        dispatch(setActiveNotes(active));
        dispatch(toggleNoteModal());
      }
    } else {
      if (old !== "") {
        dispatch(
          editNote({
            old: old,
            new: text,
          }),
        );
        setText("");
        dispatch(setStale(""));
        dispatch(toggleNoteModal());
      } else {
        dispatch(addNote(text));
        setText("");
        dispatch(toggleNoteModal());
      }
    }
  };

  const handleCancel = () => {
    setText("");
    dispatch(toggleNoteModal());
  };

  useEffect(() => {
    setText(old);
  }, [old]);

  return (
    <Modal isVisible={visible} avoidKeyboard={true} style={styles.modalBg}>
      <View style={styles.modalBase}>
        <View style={styles.modalCard}>
          <TextInput
            style={styles.textInput}
            onChangeText={setText}
            value={text}
            multiline={true}
          />
          <View style={styles.buttonbar}>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#ef4444" }}
              onPress={handleCancel}
            >
              <Text>X</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.button, backgroundColor: "#4ade80" }}
              onPress={handleSubmit}
            >
              <Text>✓</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBg: {
    //backgroundColor: 'green',
    justifyContent: "center",
    alignItems: "center",
  },
  modalBase: {
    backgroundColor: "#d1d5db",
    borderRadius: 12,
    width: 250,
    height: 400,
    marginHorizontal: "auto",
  },
  modalCard: {
    // backgroundColor: 'green',
    margin: 8,
    height: 400,
    borderRadius: 10,
  },
  textInput: {
    height: 340,
    textAlignVertical: "top",
    padding: 8,
    backgroundColor: "white",
    borderRadius: 12,
  },
  buttonbar: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#ef4444",
  },
});
