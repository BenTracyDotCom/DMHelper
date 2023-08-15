import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { currentQuestUpdated } from '../features/campaigns/campaignSlice.js';
import { storeEncounter } from '../data/encountersDB.js';
import MultiSelect from 'react-native-multiple-select';
import { useNavigation } from '@react-navigation/native';
import {addNote, deleteNote, editNote} from '../features/encounter/encounterSlice.js'


export default function EncounterBuilder( {route} ) {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [monsters, setMonsters] = useState([])
  const [selectedNPCs, setSelectedNPCs] = useState([])
  const [note, setNote] = useState('Let\'s kill some Redbrands! ')
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null)

  const currentQuest = useSelector((state) => state.campaign.currentQuest)
  const npcs = useSelector((state) => state.campaign.npcs)
  const encounterNotes = useSelector((state) => state.encounter.notes)

  const handleAddNote = () => {
    dispatch(addNote(note));
    setNote('');
  }

  const startEditNote = (index) => {
    setSelectedNoteIndex(index);
    setNote(encounterNotes[index])
  }

  const saveEditNote = () => {
    dispatch(editNote({index: selectedNoteIndex, newNote: note}));
    setNote('');
    setSelectedNoteIndex(null);
  }

  const cancelEditNote = () => {
    setNote('');
    setSelectedNoteIndex(null);
  }

  const navigateToMonsterAdding = () => {
    navigation.navigate('MonsterAdding')
  }

  const submitEncounter = () => {
    const newEncounter = {
      title,
      location,
      active: 1,
      npcs: selectedNPCs,
      monsters: selectedMonsters,
      notes: []
    };

    selectedMonsters.forEach(monster => {
      dispatch(addNPC(monster));
    })

    storeEncounter(newEncounter)
    addEncounter(newEncounter)

    dispatch(currentQuestUpdated({...currentQuest, encounter: newEncounter}))
    dispatch(addNPC(selectedMonsters))

    setTitle('')
    setLocation('')
    setSelectedNPCs([])
    setSelectedMonsters([])
  }

  const selectedMonsters = useSelector((state) => state.encounterBuilder.selectedMonsters)

  useEffect(() => {
    if (route.params?.selectedMonsters) {
      setSelectedMonsters(route.params.selectedMonsters)
    }
  }, [route.params?.selectedMonsters])

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Location'
        value={location}
        onChangeText={(text) => setLocation(text)}
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
        searchInputStyle={{color: '#CCC'}}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      ></MultiSelect>
      <View>
        {selectedMonsters && Object.values(selectedMonsters).map((monster) => (
          <View key={monster.url}>
          <Text>{`${monster.url.split('/')[3]}: ${monster.count}`}</Text>
          </View>
        ))}
      </View>
      <Button
      title="Add Monster"
      onPress={() => navigation.navigate('MonsterAdding')}
      />
        <TextInput
        style={styles.input}
        placeholder='Add a note'
        value={note}
        onChangeText={(text) => setNote(text)}
      ></TextInput>
      {selectedNoteIndex === null ? (
        <Button
        title='Add Note'
        onPress={handleAddNote}
        />
      ) : (
        <>
          <Button
          title="Save Edit"
          onPress={saveEditNote}
          />
          <Button
            title="Cancel Edit"
            onPress={cancelEditNote}
          />
        </>
      )}
      <View>
        {encounterNotes.map((note, index) => (
          <View key={index} style={styles.noteCard}>
            <Text>{note}</Text>
            <Button
            title="Edit"
            onPress={() => startEditNote(index)}
            />
            <Button
            title="Delete"
            onPress={() => dispatch(deleteNote(note))}
            />
          </View>
        ))}
      </View>
      <Button
        title='Submit Encounter'
        onPress={submitEncounter}
      />

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  monsterCard: {
    backgroundColor: 'crimson',
    color: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  noteCard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
