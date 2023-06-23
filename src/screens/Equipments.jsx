import React, {useState, useEffect} from 'react'
import {Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Equipment from './Equipment'

export default function Equipments() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    const fetchEquipments = async() => {
      try {
        setLoading(true)
        const response = await fetch('https://www.dnd5eapi.co/api/equipment')
        const json = await response.json()
        let promises = json.results.map(equipment => fetch(`https://www.dnd5eapi.co${equipment.url}`));
        let equipmentDetails = await Promise.all(promises.map(p => p.then(resp => resp.json())))
        setData(equipmentDetails)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEquipments()
  }, [])

  useEffect(() => {
    const filtered = data.filter(equipment => equipment.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredData(filtered)
  }, [searchQuery, data])

  const handlePress = (equipment) => {
    navigation.navigate('Equipment', {equipmentUrl: equipment.url})
  }

  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Equipment</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search Equipment"
        ></TextInput>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.url}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.itemDetails}>
                <Text style={styles.itemDetail}>Cost: {item.cost.quantity} {item.cost.unit}</Text>
                <Text style={styles.itemDetail}>Weight: {item.weight}</Text>
                {/* <Text style={styles.itemDetail}>Category: {item.equipment_category.name}</Text>
                <Text style={styles.itemDetail}>Gear Category: {item.gear_category.name}</Text> */}
              </View>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#1F2937'
  },
  title: {
    fontSize: 20,
    color: '#FBBF24',
    marginBottom: 5,
    textAlign: 'center'
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
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#D1D5DB',
    borderWidth: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#DC2626',
    marginBottom: 2,
  },
  itemDetails: {
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
    paddingTop: 2,
  },
  itemDetail: {
    fontSize: 14,
    color: '#1D4ED8',
  }
})