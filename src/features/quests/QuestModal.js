import React, { useState } from "react";
import {
  Modal,
  FlatList,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {addQuest, addObjective} from '../../features/campaigns/campaignSlice'

function QuestInput({ onAddQuest }) {
  const [tempQuestTitle, setTempQuestTitle] = useState('');

  return (
    <View style={styles.addQuestContainer}>
      <TextInput
        style={styles.questInput}
        placeholder="Enter new quest title"
        value={tempQuestTitle}
        onChangeText={setTempQuestTitle}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text
          style={styles.addButtonText}
          onPress={() => {
            onAddQuest(tempQuestTitle);
            setTempQuestTitle('');
          }}
        >
          Add Quest
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function ObjectiveInput({ onAddObjective }) {
  const [tempObjectiveText, setTempObjectiveText] = useState('');

  return (
    <View style={styles.addQuestContainer}>
      <TextInput
        style={styles.questInput}
        placeholder="Enter new objective"
        value={tempObjectiveText}
        onChangeText={setTempObjectiveText}
      />
      <TouchableOpacity style={styles.addButton}>
        <Text
          style={styles.addButtonText}
          onPress={() => {
            onAddObjective(tempObjectiveText);
            setTempObjectiveText('');
          }}
        >
          Add Objective
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function QuestModal({
  isVisible,
  onClose,
  quests,
  setCurrentQuest,
  handleObjectivePress,
  toggleQuestModal
}) {
  const dispatch = useDispatch();
  const currentQuest = useSelector((state) => state.campaign.currentQuest);
  const [newQuestTitle, setNewQuestTitle] = useState('');
  const [tempQuestTitle, setTempQuestTitle] = useState('');
  const [newObjectiveText, setNewObjectiveText] = useState('');
  const [tempObjectiveText, setTempObjectiveText] = useState('');
  const [showQuestInput, setShowQuestInput] = useState(false);
  const [showObjectiveInput, setShowObjectiveInput] = useState(false);

  const handleQuestPress = (quest) => {
    if (currentQuest === quest.title) {
      setCurrentQuest(null);
    } else {
      setCurrentQuest(quest.title);
    }
  };

  const handleAddQuest = () => {
    if (newQuestTitle) {
      dispatch(addQuest(newQuestTitle));
      setNewQuestTitle('')
      setShowQuestInput(false);
    }
  }

  const handleAddObjective = (questIndex) => {
    if (newObjectiveText) {
      dispatch(addObjective({questIndex, objective: newObjectiveText}))
      setNewObjectiveText('')
      setShowObjectiveInput(false);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalBox}>
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
                        onAddObjective={(objectiveText) => {
                          setNewObjectiveText(objectiveText);
                          handleAddObjective(questIndex);
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
                      handleAddQuest();
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
        </View>
      </View>
    </Modal>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxHeight: '60%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  objective: {
    marginLeft: 20,
    fontSize: 16,
  },
  addQuestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    height: 40,
  },
  questInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding:  10,
    height: 20,
  },
  addButton: {
    backgroundColor: '#d1d5db',
    padding: 5,  // Reduced padding to make the button smaller
    borderRadius: 5,
    height: 20,  // Adjusted height to align with the text field
    justifyContent: 'center', // Center the text vertically within the button
  },
  addButtonText: {
    fontSize: 16,
    color: 'blue',
    height: 20,
    justifyContent: 'center',
  }
});
