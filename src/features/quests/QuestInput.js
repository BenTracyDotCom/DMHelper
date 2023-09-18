import React, {useState, useCallback} from "react";
import {TextInput, TouchableOpacity, Text, View} from "react-native";
import { styles } from "./styles";

function QuestInput({onAddQuest}) {
  const [tempQuestTitle, setTempQuestTitle] = useState('')

  const handleAddQuest = useCallback(() => {
    if (tempQuestTitle) {
      onAddQuest(tempQuestTitle);
      setTempQuestTitle;
    }
  }, [tempQuestTitle, onAddQuest]);


  return (
    <View style={styles.addQuestContainer}>
      <TextInput
        style={styles.questInput}
        placeholder="Enter a new quest title"
        value={tempQuestTitle}
        onChangeText={setTempQuestTitle}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddQuest}>
        <Text style={styles.addButtonText}>Add Quest</Text>
      </TouchableOpacity>
    </View>
  );
}

export default QuestInput