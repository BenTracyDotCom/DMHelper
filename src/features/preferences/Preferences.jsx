import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { useSelector, useDispatch } from 'react-redux';
import { showPrefs } from "./preferencesSlice";
import { toggle20Mode, toggleNon20Mode, setDelay, saveDiePrefs } from "../dieroll/dierollSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Preferences() {

  const dispatch = useDispatch()
  const visible = useSelector(state => state.prefs.shown)
  const { twentyMode, nonTwentyMode, delay, non20s, twunnies } = useSelector(state => state.dieroll)
  const currentPrefs = useSelector(state => state.dieroll)
  const handleClose = () => {
    dispatch(showPrefs())
  };
  // const [diePrefs, setDiePrefs] = useState({
  //   twentyMode: twentyMode,
  //   nonTwentyMode: nonTwentyMode,
  //   delay: delay,
  //   non20s: non20s,
  //   twunnies: twunnies
  // });
  const handle20Mode = () => {
    dispatch(toggle20Mode())
    // setDiePrefs({...diePrefs, twentyMode: !diePrefs.twentyMode})
    // console.log(diePrefs, '20 dieprefs')
    dispatch(saveDiePrefs(JSON.stringify(currentPrefs)))
  };
  const handleNon20Mode = () => {
    dispatch(toggleNon20Mode())
    // setDiePrefs({...diePrefs, nonTwentyMode: !diePrefs.nonTwentyMode})
    // console.log(diePrefs, 'non20 diePrefs')
    dispatch(saveDiePrefs(JSON.stringify(currentPrefs)))
  };
  const handleDelay = (item) => {
    const newDelay = parseInt(item) * 1000
    dispatch(setDelay(newDelay));
    //setDiePrefs({...diePrefs, delay: newDelay})
    dispatch(saveDiePrefs(JSON.stringify(currentPrefs)))
  };
  
  return (
    <Modal visible={visible} avoidKeyboard={true} >
      <View style={styles.modalBg}>
        <View style={styles.modalBase}>
          <View style={styles.modalCard}>
            <TouchableOpacity onPress={handleClose}>
              <Text>Prefs (tap to close)</Text>
            </TouchableOpacity>
            <Text>d20 display:</Text>
            <TouchableOpacity style={styles.option} onPress={handle20Mode}>
              <Text>{twentyMode}</Text>
            </TouchableOpacity>
            <Text>d4-d12 display:</Text>
            <TouchableOpacity style={styles.option} onPress={handleNon20Mode}>
              <Text>{nonTwentyMode}</Text>
            </TouchableOpacity>
            {(nonTwentyMode === 'delay' || twentyMode === 'delay') && <View>
              <Text>Delay before reseting die:</Text>
              <SelectDropdown
                data={['3s', '5s', '10s', '30s', '60s']}
                onSelect={handleDelay}
                defaultButtonText={`${(delay / 1000).toString()}s`}
                buttonTextAfterSelection={item => `${item}`}
              />
            </View>}
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBg: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  modalBase: {
    backgroundColor: '#d1d5db',
    borderRadius: 12,
    width: 250,
    height: 400,
    marginHorizontal: 'auto',
  },
  modalCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    maxHeight: 400,
    width: '90%',
  },
  listContainer: {
    flexGrow: 1
  },
  encounter: {
    backgroundColor: 'white',
    borderRadius: 12
  },
  text: {
    fontFamily: 'Scada',
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#ef4444'
  },
  save: {

  },
  cancel: {

  },
  option: {
    backgroundColor: '#d1d5db'
  }

})