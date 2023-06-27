import { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import CharacterList from '../features/campaigns/CharacterList';

export default function Campaign() {

  const campaign = useSelector(state => (state.campaign))
  const [loading, setLoading] = useState(false)

  if(loading){
    return <StatusBar />
  }

  else {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Main Quest:</Text>
          <Text>{Object.keys(campaign.quests)[0]}</Text>
          <Text>Current Objective:</Text>
          <Text>{campaign.currentQuest}</Text>
        </View>
        <View style={styles.contentContainer}>
          <ScrollView style={styles.leftColumn}>
            <View style={styles.scrollableContent}>
              <Text>
                <CharacterList />
              </Text>
            </View>
          </ScrollView>
          <View style={styles.rightColumn}>
            <Text>
              // Fixed height content goes here...
            </Text>
          </View>
        </View>
      </View>
    );
  };

  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 200,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  leftColumn: {
    flex: 1,
    backgroundColor: 'white',
    height: '100%',
  },
  scrollableContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  rightColumn: {
    flex: 1,
    backgroundColor: 'lightgray',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});