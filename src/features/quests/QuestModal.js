import React, {useState, useCallback} from "react";
import {View, Modal, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {addQuest, addObjective} from '../campaigns/campaignSlice'
import QuestModalBody from './QuestModalBody';

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

  const [showQuestInput, setShowQuestInput] = useState(false);
  const [showObjectiveInput, setShowObjectiveInput] = useState(false);

  const handleQuestPress = useCallback(
    (quest) => {
      setCurrentQuest(currentQuest === quest.title ? null : quest.title);
    },
    [currentQuest, setCurrentQuest]
  )

  const handleAddQuest = useCallback(
    (newQuestTitle) => {
      if (newQuestTitle) {
        dispatch(addQuest(newQuestTitle));
        setShowObjectiveInput(false);
      }
    },
    [dispatch]
  )
  const onAddObjective = useCallback(
    (questTitle, newObjectiveText) => {
      if (newObjectiveText && questTitle) {
        dispatch(addObjective({ questTitle, objective: newObjectiveText }));
        setShowObjectiveInput(false);
      }
    },
    [dispatch]
  );



  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <QuestModalBody
            quests={quests}
            currentQuest={currentQuest}
            handleQuestPress={handleQuestPress}
            handleObjectivePress={handleObjectivePress}
            showObjectiveInput={showObjectiveInput}
            setShowObjectiveInput={setShowObjectiveInput}
            onAddObjective={onAddObjective}
            showQuestInput={showQuestInput}
            setShowQuestInput={setShowQuestInput}
            onAddQuest={handleAddQuest}
            onClose={onClose}
          />
        </View>
      </View>
    </Modal>
  )
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
    maxHeight: '60%'
  }
})