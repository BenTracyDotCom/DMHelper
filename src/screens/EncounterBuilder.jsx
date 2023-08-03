import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {currentQuestUpdated} from '../features/campaigns/campaignSlice.js'
import {Encounter, Character} from '../data/encountersDB.js'
import {storeEncounter, getEncounter, removeEncounter} from '../data/encountersDB.js'
import MultiSelect from 'react-native-multiple-select';

export default function EncounterBuilder() {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')
  const [xpEarned, setXpEarned] = useState('')
  const [selectedChars, setSelectedChars] = useState([]);

  const currentQuest = useSelector((state) => state.campaign.currentQuest)
  const characters = useSelector((state) => state.campaign.characters)

  const submitEncounter = () => {
    const newEncounter = {
      title,
      active: 1,
      target: Number(target),
      xpEarned: Number(xpEarned),
      loot: [],
      chars: [],
    }

    storeEncounter(newEncounter)

    dispatch(currentQuestUpdated({...currentQuest, encounter: newEncounter}))

    setTitle('')
    setTarget('')
    setXpEarned('')
    setSelectedChars([])
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Encounter Builder</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Target'
        value={target}
        onChangeText={(text) => setTarget(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='XP Earned'
        value={xpEarned}
        onChangeText={(text) => setXpEarned(text)}
      />
      <MultiSelect
        items={characters}
        uniqueKey="name"
        onSelectedItemsChange={setSelectedChars}
        selectedItems={selectedChars}
        selectText="Pick Characters"
        searchInputPlaceholderext="Search Characters..."
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
      <Button
        title='Submit Encounter'
        onPress={submitEncounter}
      />
    </View>
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
});
