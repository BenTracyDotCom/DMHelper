import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import QuestInput from "./QuestInput";
import ObjectiveInput from "./ObjectiveInput";
import {useDispatch, useSelector} from "react-redux";
import {addObjective} from '../campaigns/campaignSlice'

function QuestModalBody({
  quests,
  currentQuest,
  handleQuestPress,
  handleObjectivePress,
  showObjectiveInput,
  setShowObjectiveInput,
  onAddObjective,
  showQuestInput,
  setShowQuestInput,
  onAddQuest,
  onClose
}) {
  const [newObjectiveText, setNewObjectiveText] = useState('');
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <FlatList
        data={quests}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Quests</Text>
        )}
        renderItem={({ item, index: questIndex }) => (
          <TouchableOpacity onPress={() => handleQuestPress(item)}>
            <Text>{item.title}</Text>
            {currentQuest === item.title && (
              <>
                <FlatList
                  data={item.objectives}
                  renderItem={({ item: objective, index: objectiveIndex }) => (
                    <TouchableOpacity
                      onPress={() => {
                        handleObjectivePress(questIndex, objectiveIndex);
                        onClose();
                      }}
                    >
                      <Text style={styles.objective}>{objective}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => `${index}`}
                />
                {showObjectiveInput ? (
                  <ObjectiveInput
                    questTitle={item.title}
                    onAddObjective={(questTitle, objectiveText) => {
                      dispatch(addObjective({questTitle, objective: objectiveText}))
                    }}
                  />
                ) : (
                  <TouchableOpacity onPress={() => setShowObjectiveInput(true)}>
                    <Text style={styles.addButtonText}> Add Objective</Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
        ListFooterComponent={() => (
          <>
            {showQuestInput ? (
              <QuestInput
                onAddQuest={(questTitle) => {
                  setNewQuestTitle(questTitle);
                  onAddQuest(questTitle);
                }}
              />
            ) : (
              <TouchableOpacity onPress={() => setShowQuestInput(true)}>
                <Text style={styles.addButtonText}>Add Quest</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text>Close</Text>
            </TouchableOpacity>
          </>
        )}
      />
    </>
  );
}

export default QuestModalBody;
