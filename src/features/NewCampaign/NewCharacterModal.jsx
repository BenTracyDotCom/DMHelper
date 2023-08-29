import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddCharacter, characterAdded } from "./newCampaignSlice";
import { useState } from "react";
import { races } from "../../../utilities/selectorData/races";
import { classes } from "../../../utilities/selectorData/classes";

export default function NewCharacterModal() {
  const dispatch = useDispatch();

  const addCharacterVisible = useSelector(
    (state) => state.newCampaign.addCharacter,
  );
  const campaignName = useSelector((state) => state.newCampaign.campaign.title);

  const [name, setName] = useState("");
  const [charType, setCharType] = useState("");
  const [race, setRace] = useState("");
  const [otherRace, setOtherRace] = useState(null);
  const [charClass, setCharClass] = useState("");
  const [level, setLevel] = useState(null);
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("");
  const resetEntries = () => {
    setName("");
    setCharType("");
    setRace("");
    setOtherRace(null);
    setCharClass("");
    setLevel(null);
    setNotes([]);
    setNote("");
  };

  const handlePlayer = (name) => {
    const newNote = `${name}'s character`;
    const oldNotes = notes.slice(0);
    if (!oldNotes[0] || oldNotes[0].slice(-9) === "character") {
      oldNotes[0] = newNote;
    } else {
      oldNotes.unshift(newNote);
    }
    setNotes(oldNotes);
  };

  const handleNPCLocation = (text) => {
    const oldNotes = notes.slice(0);
    const newNote = `Location: ${text}`;
    if (oldNotes[0].slice(0, 9) === "Location:") {
      oldNotes[0] = newNote;
    } else {
      oldNotes.unshift(newNote);
    }
    setNotes(oldNotes);
  };
  const handleAddNote = () => {
    const toChange = notes.slice(0);
    toChange.push(note);
    setNotes(toChange);
    setNote("");
  };
  const handleRemoveNote = () => {
    const toShorten = notes.slice(0);
    toShorten.pop();
    setNotes(toShorten);
  };

  const handleCancel = () => {
    resetEntries();
    dispatch(toggleAddCharacter());
  };
  const handleSubmit = () => {
    const character = {
      name: name,
      type: charType === "Player" ? "pc" : "npc",
      race: race !== "Other" ? race : otherRace,
      class: charClass,
      level: level,
      status: [],
      notes: notes,
    };
    dispatch(characterAdded(character));
    resetEntries();
    dispatch(toggleAddCharacter());
  };

  return (
    <Modal visible={addCharacterVisible}>
      <View>
        <Text>Character type:</Text>
        <SelectDropdown data={["Player", "NPC"]} onSelect={setCharType} />
        <TextInput onChangeText={setName} placeholder={"Character name"} />
        {charType === "Player" && (
          <TextInput placeholder="Player's name" onChangeText={handlePlayer} />
        )}
        {charType === "NPC" && (
          <TextInput
            placeholder="NPC's location"
            onChangeText={handleNPCLocation}
          />
        )}
        <Text>Race:</Text>
        <SelectDropdown data={races} onSelect={setRace} />
        {race === "Other" && (
          <TextInput placeholder="Enter Race" onChangeText={setOtherRace} />
        )}
        <Text>Class:</Text>
        <SelectDropdown data={classes} onSelect={setCharClass} />
        <Text>Level:</Text>
        <SelectDropdown
          data={[...Array(20).keys()].map((num) => num + 1)}
          onSelect={setLevel}
        />
        <Text>Notes:</Text>
        {!!notes.length &&
          notes.map((note, i) => <Text key={`note${i}`}>{note}</Text>)}
        <TextInput placeholder="Add note" onChangeText={setNote} value={note} />
        <View style={styles.buttonbar}>
          <TouchableOpacity style={styles.button} onPress={handleRemoveNote}>
            <Text>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: "green" }}
            onPress={handleAddNote}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity className="h-[30px] mt-10" onPress={handleSubmit}>
          <Text>{`Add character to ${
            campaignName ? campaignName : "new campaign"
          }`}</Text>
        </TouchableOpacity>
        <TouchableOpacity className="h-[30px] mt-10" onPress={handleCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  buttonbar: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    width: "30%",
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
