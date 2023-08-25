import { View, Text, StyleSheet, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setInitiative, sortByInitiative } from "../encounter/encounterSlice";
import { setAllEnemies, setEnemiesByType } from "../encounter/encounterSlice";
import { useState } from "react";

export default function InitiativeChar({ char }) {

  const dispatch = useDispatch()
  const [value, setValue] = useState(null)

  const groupMode = useSelector(state => state.initiative.groupMode)

  const bg = char.type === 'enemy' ? '#fecaca' : char.type === 'npc' ? '#a5f3fc' : 'white'

  let placeholder = ''
  if(char.type === 'enemy'){
    let modifier = Math.floor((char.data.dexterity - 10) / 2)
    if(modifier > 0){
      placeholder = `+${modifier.toString()}`
    } else {
      placeholder = modifier.toString()
    }
  } else if (char.type === 'npc'){
    placeholder = char.stats.dex
  }

  const onSubmitEditing = (e) => {
    const { text } = e.nativeEvent
    if (char.type === 'enemy' && groupMode === 0) {
      //Manage all 'enemy' types together
      dispatch(setAllEnemies(parseInt(text)))
    } else if (groupMode === 1 && char.type === 'enemy') {
      //Manage enemies with matching names(the action slices the last few characters so A, B, AA, don't matter)
      dispatch(setEnemiesByType({
        name: char.name,
        initiative: parseInt(text)
      }))
    } else {
      //GroupMode is set to none, all enemies handled individually
      dispatch(setInitiative({
        name: char.name,
        initiative: parseInt(text)
      }))
    }
  }

    return (
      <View style={styles.container}>
        <View style={[styles.button, { backgroundColor: bg }]}>
          <Text style={styles.buttonText}>{char.name}</Text>
        </View>
        <View style={styles.secondaryContainer}>
          <View style={[styles.secondaryButton, { backgroundColor: bg }]}>
            <TextInput style={styles.input} 
            onSubmitEditing={onSubmitEditing} 
            placeholder={placeholder}
            keyboardType="numeric"
            value={char.initiative > 0 ? char.initiative.toString() : value}
            onChangeText={setValue}
            />
          </View>

        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      marginHorizontal: 3,
      marginBottom: 2,
      borderRadius: 8,
      flexGrow: 1,
      padding: 8,
    },
    buttonText: {
      fontFamily: 'Scada',
      fontSize: 18,
      textAlign: 'center',
    },
    secondaryContainer: {
      flexDirection: 'row',
    },
    secondaryButton: {
      marginBottom: 2,
      borderRadius: 8,
      padding: 8,
    },
    secondaryButtonText: {
      fontFamily: 'Scada-Bold',
      fontSize: 24,
      textAlign: 'center',
    },
    smallButton: {
      marginHorizontal: 3,
      marginBottom: 2,
      width: 60,
      borderRadius: 8,
      padding: 8,
    },
    smallButtonTextLarge: {
      fontFamily: 'Scada-Bold',
      fontSize: 24,
      textAlign: 'center',
    },
    smallButtonTextSmall: {
      fontFamily: 'Scada-Bold',
      fontSize: 18,
      textAlign: 'center',
    },
    iconContainer: {
      padding: 8,
    },
  })