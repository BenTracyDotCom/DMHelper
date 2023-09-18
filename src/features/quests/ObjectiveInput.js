import React, {useState, useCallback} from "react";
import {TextInput, TouchableOpacity, Text, View} from "react-native";
import {styles} from "./styles";
import {useDispatch, useSelector} from "react-redux";

function ObjectiveInput({ onAddObjective, questTitle }) {
  const [tempObjectiveText, setTempObjectiveText] = useState('');

  const handleAddObjective = useCallback(() => {
    if (tempObjectiveText) {
      onAddObjective(questTitle, tempObjectiveText);
      setTempObjectiveText('')
    }
  }, [tempObjectiveText, onAddObjective, questTitle])

  const dispatch = useDispatch();


  return (
    <View style={styles.addQuestContainer}>
      <TextInput
        style={styles.questInput}
        placeholder="Enter new objective"
        value={tempObjectiveText}
        onChangeText={setTempObjectiveText}
        onKeyPress={({nativeEvent}) => {
          setTempObjectiveText((prev) => prev + nativeEvent.key)
        }}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddObjective}>
        <Text style={styles.addButtonText}>Add Objective</Text>
      </TouchableOpacity>
    </View>
  )
};

export default ObjectiveInput;