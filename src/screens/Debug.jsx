import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import React from 'react';
import Home from './Home';
import Launch from './Launch';
import Spell from './Spell';
import Spells from './Spells';
import Encounter from './Encounter';
import EncounterBuilder from './EncounterBuilder';
import Monsters from './Monsters';
import Campaign from './Campaign';
import Equipment from './Equipment'
import Equipments from './Equipments'
import Weapons from './Weapons'
import MagicItems from './MagicItems'

export default function ({ navigation }) {
  const [show, setShow] = useState(false);
  const state = useSelector(state => (state));

  // Add new pages to this object to have them show up on the list all neat like

  const pages = {
    Launch: Launch,
    Home: Home,
    Spells: Spells,
    Encounter: Encounter,
    Monsters: Monsters,
    Equipment: Equipments,
<<<<<<< HEAD
    Weapons: Weapons,
    Magic_Items: MagicItems,
=======
    EncounterBuilder: EncounterBuilder,
>>>>>>> cf97bdeb5d8301ca01f067318c5dcb71d3302e18
  }

  return (
    <View>
      <Modal
        animationType="slide"
        visible={show}
        presentationStyle='pageSheet'
      >
        <Text className="w-11/12 h-11/12 m-auto">
          Current State:
        </Text>
        <ScrollView>
          {Object.keys(state).map(stateThing => (
            <React.Fragment key="stateThing">
              <Text className="font-bold ml-5 my-2">{stateThing}:</Text>
              <Text className="ml-5">{JSON.stringify(state[stateThing])}</Text>
            </React.Fragment>
          ))}
        </ScrollView>
        <TouchableOpacity onPress={() => setShow(false)} className="m-auto">
          <Text className="text-blue-500">Click to close</Text>
        </TouchableOpacity>
      </Modal>
      <Text className="mx-auto mt-5 text-2xl">
        Screens
      </Text>
      <TouchableOpacity className="mx-auto mt-5 w-11/12 bg-teal-700 rounded-2xl"
      key="campaign"
      onPress={() => navigation.navigate('Campaign', {name: state.campaign.title})}><Text className="p-2 m-auto text-white">
        Campaign
      </Text>

      </TouchableOpacity>
      {Object.keys(pages).map(page => (
        <TouchableOpacity className="mx-auto mt-5 w-11/12 bg-teal-700 rounded-2xl"
         key={pages[page]}
         onPress={() => {navigation.navigate(pages[page])}}>
          <Text className="p-2 m-auto text-white">
            {page}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setShow(true)} className="mx-auto my-5 rounded-2xl bg-slate-500">
        <Text className="text-white p-5">Current State</Text>
      </TouchableOpacity>
    </View>
  )
}