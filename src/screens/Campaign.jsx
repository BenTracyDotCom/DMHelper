import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../features/campaigns/Header';
import Footer from '../features/campaigns/Footer';
import CharacterList from '../features/campaigns/CharacterList';
import Notes from '../features/notes/Notes';
import AddNote from '../features/notes/AddNote';
import EncounterMenu from '../features/encounter/EncounterMenu';
import QuestModal from '../features/quests/QuestModal.js'
import {currentQuestUpdated, setCurrentObjectiveIndex, nextObjective, previousObjective} from '../features/campaigns/campaignSlice.js'

export default function Campaign({ navigation }) {

  const dispatch = useDispatch();

  const campaign = useSelector(state => (state.campaign))
  const [loading, setLoading] = useState(false)
  const [isQuestModalVisible, setIsQuestModalVisible] = useState(false);

  const toggleQuestModal = () => {
    setIsQuestModalVisible(!isQuestModalVisible);
  }

  const setCurrentQuest = (questTitle) => {
    console.log(questTitle, 'questTitle', typeof questTitle)
    dispatch(currentQuestUpdated(questTitle));
  }

  const campaignState = useSelector(state => state.campaign)

  const currentObjectiveIndex = campaignState.currentObjectiveIndex
  const currentQuestData = useSelector(state => state.campaign.quests.find(quest => quest.title === state.campaign.currentQuest));
  const currentObjective = campaignState.quests.find(quest => quest.title === campaignState.currentQuest)

  const handleNextObjective = () => {
    dispatch(nextObjective());
  }

  const handlePreviousObjective = () => {
    dispatch(previousObjective())
  }

  const handleObjectivePress = (questIndex, objectiveIndex) => {
    const selectedQuest = campaign.quests[questIndex]

    if (selectedQuest) {
      dispatch(currentQuestUpdated(selectedQuest.title));
    }
    dispatch(setCurrentObjectiveIndex(objectiveIndex))
  }

  if (loading) {
    return <StatusBar />
  }

  const currentQuest = useSelector(state => state.campaign.currentQuest)

  // TODO: Add Quest Management Screen ("Journal")
  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity onPress={toggleQuestModal}>
        <Text style={styles.currentQuestTitle}>Current Quest: {currentQuest ? currentQuest : 'Loading...'}</Text>
      </TouchableOpacity>
      <Text style={styles.currentObjectiveText}>Current Objective: {currentQuestData && currentObjectiveIndex !== undefined ? currentQuestData.objectives[currentObjectiveIndex] : 'None'}</Text>
      <View style={styles.objectiveButtonsContainer}>
      <TouchableOpacity style={styles.objectiveButton} onPress={handlePreviousObjective}>
          <Text style={styles.objectiveButtonText}>Previous Objective</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.objectiveButton} onPress={handleNextObjective}>
          <Text style={styles.objectiveButtonText}>Next Objective</Text>
        </TouchableOpacity>
      </View>
      <Button title="Show Quests" onPress={toggleQuestModal}></Button>
      <Button title="Log Current State" onPress={() => console.log(campaign)} />
      <View style={styles.content}>
        <AddNote />
        <EncounterMenu navigation={navigation} />
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <Text style={styles.columnTitle}>Party</Text>
          </View>
          <ScrollView style={styles.columnScrollView}>
            <CharacterList />
          </ScrollView>
        </View>
        <View style={styles.column}>
          <View style={styles.columnHeader}>
            <Text style={styles.columnTitle}>Notes</Text>
          </View>
          <View style={styles.whiteboard}>
            <ScrollView style={styles.columnScrollView}>
              <Notes />
            </ScrollView>
          </View>
          <QuestModal
            isVisible={isQuestModalVisible}
            onClose={toggleQuestModal}
            quests={campaign.quests}
            setCurrentQuest={setCurrentQuest}
            handleObjectivePress={handleObjectivePress}
          ></QuestModal>
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
  },
  columnHeader: {
    padding: 16,
    alignItems: 'center',
  },
  columnScrollView: {
    flex: 1,
  },
  columnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Scada'
  },
  whiteboard: {
    flex: 1,
    borderStyle: 'solid',
    borderColor: 'red',
    backgroundColor: 'white',
    borderRadius: 12,
    margin: 4
  },
  currentQuestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  currentObjectiveText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
    marginVertical: 5,
  },
  objectiveButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  objectiveButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  objectiveButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});