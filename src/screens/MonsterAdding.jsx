import React, {useState, useEffect} from 'react'
import {Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, StyleSheet, Switch, Button} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Monster from './Monster'
import {useDispatch, useSelector} from 'react-redux';
import {selectMonster} from '../features/encounter/encounterBuilderSlice.js'

export default function MonsterAdding() {

  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [maxChallenge, setMaxChallenge] = useState('30')
  const [loading, setLoading] = useState(false)
  const [selectedMonsters, setSelectedMonsters] = useState({})

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleMonsterSelect = (monster) => {
    dispatch(selectMonster(monster))
  }

  useEffect(() => {
    const fetchMonsters = async() => {
      try {
        setLoading(true)
        const response = await fetch('https://www.dnd5eapi.co/api/monsters')
        const json = await response.json()
        const promises = json.results.map(monster => fetch(`https://www.dnd5eapi.co${monster.url}`))
        const monsterDetails = await Promise.all(promises.map(p => p.then(resp => resp.json())))
        setData(monsterDetails)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMonsters()
  }, [])

  useEffect(() => {
    console.log(selectedMonsters)
  }, [selectedMonsters])

  useEffect(() => {
    const filtered = data && data.filter(monster => monster.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    monster.challenge_rating <= maxChallenge
    )
    setFilteredData(filtered)
  }, [searchQuery, data, maxChallenge])

  const handlePress = (item) => {
    navigation.navigate('Monster', {monster: item})
  }

  const handleSelectMonster = (monster) => {
    setSelectedMonsters(prevState => ({
      ...prevState,
      [monster.url]: (prevState[monster.url] || 0) + 1
    })),
    dispatch(selectMonster(monster))
  }

  const handleDeselectMonster = (monster) => {
    setSelectedMonsters(prevState => ({
      ...prevState,
      [monster.url]: prevState[monster.url] > 0 ? prevState[monster.url] - 1: 0
    })),
    dispatch(deSelectMonster(monster))
  }

  if (loading) {
    return <ActivityIndicator/>
  }

  return (
    <View className="h-full p-5 bg-gray-800">
      <Text className="text-2xl text-white mb-5 text-center">Monsters</Text>
      <Button
      title="Return to Encounter Builder"
      onPress={() => navigation.navigate('EncounterBuilder', {selectedMonsters})}
      ></Button>
      <View style={styles.searchBarContainer}>
        <TextInput
        style={styles.searchBar}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Search Monsters"
        ></TextInput>
        <TextInput
        style={styles.challengeInput}
        onChangeText={value => {
          if (!isNaN(value)) {
            setMaxChallenge(value)
          }
        }}
        value={maxChallenge}
        placeholder="max CR"
        keyboardType="numeric"
        ></TextInput>
      </View>
      <FlatList
      data={filteredData}
      renderItem={({item}) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View style={styles.monsterCard}>
            <Text style={styles.monsterName}> {item.name} {selectedMonsters[item.url] || 0}</Text>
            <View style={styles.buttonContainer}>
              <Button
                title="+"
                onPress={() => handleSelectMonster(item)}
                color="#841584"
                style={styles.button}
              ></Button>
              <Button
                title="-"
                onPress={() => handleDeselectMonster(item)}
                color="#841584"
                style={styles.button}
              ></Button>
            </View>
            <Text style={styles.monsterCR}>CR: {item.challenge_rating}</Text>
          </View>
        </TouchableOpacity>
      )}
      >
      </FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#1F2937'
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginRight: 10,
  },
  challengeInput: {
    width: 100,
    height: 40,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white'
  },
  monsterCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  monsterName: {
    fontSize: 18,
    color: '#DC143C',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
  },
  monsterCR: {
    fontSize: 14,
    color: '#DC143C',
  }
})