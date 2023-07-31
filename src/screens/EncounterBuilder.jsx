import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {currentQuestUpdated} from '../features/campaigns/campaignSlice.js'
import {Encounter, Character} from '../data/encountersDB.js'
import {storeEncounter, getEncounter, removeEncounter} from '../data/encountersDB.js'

export default function EncounterBuilder() {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [target, setTarget] = useState('')
  const [xpEarned, setXpEarned] = useState('')

  const currentQuest = useSelector((state) => state.campaign.currentQuest)

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
  }

  return (
    <View>
      <Text>Encounter Builder</Text>
      <TextInput
      placeHolder="Title"
      value={title}
      onChangeText={(text) => setTitle(text)}
      ></TextInput>
      <TextInput
        placeholder='Target'
        value={target}
        onChangeText={(text) => setTarget(text)}
      />
      <TextInput
        placeholder='XP Earned'
        value={xpEarned}
        onChangeText={(text) => setXpEarned(text)}
      />
      <Button
      title='Submit Encounter'
      onPress={submitEncounter}
      ></Button>
    </View>
  )
}