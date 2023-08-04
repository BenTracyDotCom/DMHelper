import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {currentQuestUpdated} from '../features/campaigns/campaignSlice.js'
import {Encounter, Character} from '../data/encountersDB.js'
import {storeEncounter, getEncounter, removeEncounter} from '../data/encountersDB.js'
import MultiSelect from 'react-native-multiple-select';
import {useNavigation} from '@react-navigation/native';
import {MonsterAdding} from './MonsterAdding'
import {selectMonster, clearMonsters} from '../features/encounter/encounterBuilderSlice.js'

export default function EncounterBuilder( {route} ) {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')
  const [xpEarned, setXpEarned] = useState('')
  const [selectedChars, setSelectedChars] = useState([])
  const [monsters, setMonsters] = useState([])

  const currentQuest = useSelector((state) => state.campaign.currentQuest)
  const characters = useSelector((state) => state.campaign.characters)

  const navigateToMonsterAdding = () => {
    navigation.navigate('MonsterAdding')
  }


  const submitEncounter = () => {
    const newEncounter = {
      title,
      active: 1,
      target: Number(target),
      xpEarned: Number(xpEarned),
      loot: [],
      chars: [],
      monsters: selectedMonsters
    }

    storeEncounter(newEncounter)

    dispatch(currentQuestUpdated({...currentQuest, encounter: newEncounter}))

    setTitle('')
    setTarget('')
    setXpEarned('')
    setSelectedChars([])
  }

  const selectedMonsters = useSelector((state) => state.encounterBuilder.selectedMonsters)

  useEffect(() => {
    if (route.params?.selectedMonsters) {
      setMonsters(route.params.selectedMonsters)
    }
  }, [route.params?.selectedMonsters])

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
      ></Button>
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
  monsterCard: {
    backgroundColor: 'crimson',
    color: 'white',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  }
});
