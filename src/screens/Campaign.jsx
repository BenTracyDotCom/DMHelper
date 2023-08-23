import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../features/campaigns/Header';
import Footer from '../features/campaigns/Footer';
import CharacterList from '../features/campaigns/CharacterList';
import Notes from '../features/notes/Notes';
import AddNote from '../features/notes/AddNote';
import EncounterMenu from '../features/encounter/EncounterMenu';
import QuestModal from '../features/quests/QuestModal.js'
import {currentQuestUpdated} from '../features/campaigns/campaignSlice.js'

export default function Campaign({ navigation }) {

  const dispatch = useDispatch();

  const campaign = useSelector(state => (state.campaign))
  const [loading, setLoading] = useState(false)
  const [isQuestModalVisible, setIsQuestModalVisible] = useState(false);

  const toggleQuestModal = () => {
    setIsQuestModalVisible(!isQuestModalVisible);
  }

  const setCurrentQuest = (questTitle) => {
    dispatch(currentQuestUpdated(questTitle));
  }

  if (loading) {
    return <StatusBar />
  }

  const currentQuest = useSelector(state => state.campaign.currentQuest)

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.currentQuestTitle}>Current Quest: {currentQuest}</Text>
      <Button title="Show Quests" onPress={toggleQuestModal}></Button>
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
  }
});