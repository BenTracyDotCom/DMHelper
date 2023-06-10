import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import React from 'react';

export default function () {
  const [show, setShow] = useState(false);
  const state = useSelector(state => (state));

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
        {Object.keys(state).map(stateThing => (
          <React.Fragment>
            <Text className="font-bold ml-5 my-2">{stateThing}:</Text>
            <Text className="ml-5">{JSON.stringify(state[stateThing])}</Text>
          </React.Fragment>
        ))}
        <TouchableOpacity onPress={() => setShow(false)} className="m-auto">
          <Text className="text-blue-500">Click to close</Text>
        </TouchableOpacity>
      </Modal>
      <Text className="mx-auto mt-5">
        Screens
      </Text>
      <TouchableOpacity onPress={() => setShow(true)} className="mx-auto my-5 rounded-2xl bg-slate-500">
        <Text className="text-white p-5">Current State</Text>
      </TouchableOpacity>
    </View>
  )
}