import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { currentQuestUpdated } from "../features/campaigns/campaignSlice.js";
import { storeEncounter } from "../data/encountersDB.js";
import MultiSelect from "react-native-multiple-select";
import { useNavigation } from "@react-navigation/native";
import {
  addNote,
  deleteNote,
  editNote,
} from "../features/encounter/encounterSlice.js";
import CustomButton from "../models/CustomButton.jsx";
import { addEncounter } from "../features/encounter/encountersSlice.js";

export default function EncounterBuilder({ route }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [monsters, setMonsters] = useState([]);
  const [selectedNPCs, setSelectedNPCs] = useState([]);
  const [note, setNote] = useState("");
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);

  const currentQuest = useSelector((state) => state.campaign.currentQuest);
  const npcs = useSelector((state) => state.campaign.npcs);
  const encounterNotes = useSelector((state) => state.encounter.notes);

  const handleAddNote = () => {
    dispatch(addNote(note));
    setNote("");
  };

  const startEditNote = (index) => {
    setSelectedNoteIndex(index);
    setNote(encounterNotes[index]);
  };

  const saveEditNote = () => {
    dispatch(editNote({ index: selectedNoteIndex, newNote: note }));
    setNote("");
    setSelectedNoteIndex(null);
  };

  const cancelEditNote = () => {
    setNote("");
    setSelectedNoteIndex(null);
  };

  const navigateToMonsterAdding = () => {
    navigation.navigate("MonsterAdding");
  };

  const submitEncounter = () => {
    const newEncounter = {
      title,
      location,
      active: 1,
      npcs: selectedNPCs,
      monsters: selectedMonsters,
      notes: [],
    };

    storeEncounter(newEncounter);
    addEncounter(newEncounter);

    dispatch(currentQuestUpdated({ ...currentQuest, encounter: newEncounter }));

    setTitle("");
    setLocation("");
    setSelectedNPCs([]);
    setMonsters([]);
  };

  const selectedMonsters = useSelector(
    (state) => state.encounterBuilder.selectedMonsters,
  );

  useEffect(() => {
    if (route.params?.selectedMonsters) {
      setMonsters(route.params.selectedMonsters);
    }
  }, [route.params?.selectedMonsters]);

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholderTextColor="#A0AEC0"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        placeholderTextColor="#A0AEC0"
      />

      <MultiSelect
        items={npcs}
        uniqueKey="id"
        onSelectedItemsChange={setSelectedNPCs}
        selectedItems={selectedNPCs}
        selectText="Pick NPCs"
        searchInputPlaceholderext="Search NPCs..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: "#CCC" }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      ></MultiSelect>
      <View>
        {selectedMonsters &&
          Object.values(selectedMonsters).map((monster) => (
            <View key={monster.url} style={styles.monsterCard}>
              <Text style={styles.monsterCardText}>{`${
                monster.url.split("/")[3]
              }: ${monster.count}`}</Text>
            </View>
          ))}
      </View>
      <CustomButton
        title="Add Monster"
        onPress={() => navigation.navigate("MonsterAdding")}
        style={styles.button}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a note"
        value={note}
        onChangeText={(text) => setNote(text)}
      ></TextInput>
      {selectedNoteIndex === null ? (
        <CustomButton
          title="Add Note"
          onPress={handleAddNote}
          style={styles.button}
        />
      ) : (
        <>
          <CustomButton
            title="Save Edit"
            onPress={saveEditNote}
            style={styles.button}
          />
          <CustomButton
            title="Cancel Edit"
            onPress={cancelEditNote}
            style={styles.button}
          />
        </>
      )}
      <View>
        {encounterNotes.map((note, index) => (
          <View key={index} style={styles.noteCard}>
            <Text style={styles.noteCardText}>{note}</Text>
            <Button title="Edit" onPress={() => startEditNote(index)} />
            <Button title="Delete" onPress={() => dispatch(deleteNote(note))} />
          </View>
        ))}
      </View>
      <CustomButton
        title="Submit Encounter"
        onPress={submitEncounter}
        style={styles.button}
      />
    </ScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1F2937",
  },
  title: {
    fontSize: 28,
    color: "#DC143C",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  subHeading: {
    fontSize: 22,
    color: "#DC143C",
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: "#A0AEC0",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 18,
    borderRadius: 10,
    backgroundColor: "#F7FAFC",
  },
  monsterList: {
    marginBottom: 20,
  },
  monsterCard: {
    backgroundColor: "#F7FAFC",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  monsterCardText: {
    color: "#E53E3E",
    fontSize: 18,
  },
  notesList: {
    marginBottom: 20,
  },
  noteCard: {
    backgroundColor: "#F7FAFC",
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  noteCardText: {
    color: "#4A5568",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#DC143C",
    padding: 15,
    borderRadius: 10,
    textAlign: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
