import React, {useState, useEffect} from 'react'
import {Text, View, FlatList, ActivityIndicator, TouchableOpacity, TextInput, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import Weapon from './Weapon'

export default function Weapons() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const weaponCategories = ["equipment-categories/weapon", "equipment-categories/magic-weapon"]

  useEffect(() => {
    const fetchWeapons = async() => {
      try {
        setLoading(true)
// Inside the fetchWeapons function
        const responseNormal = await fetch('https://www.dnd5eapi.co/api/equipment-categories/weapon')
        const jsonNormal = await responseNormal.json()
        const promisesNormal = jsonNormal.equipment.map(weapon => fetch(`https://www.dnd5eapi.co${weapon.url}`).then(resp => resp.json()))

        const responseMagic = await fetch('https://www.dnd5eapi.co/api/magic-items')
        const jsonMagic = await responseMagic.json()
        const promisesMagic = jsonMagic.results.map(item => fetch(`https://www.dnd5eapi.co${item.url}`).then(resp => resp.json()))

        const weaponDetailsNormal = await Promise.all(promisesNormal)
        const allMagicItemDetails = await Promise.all(promisesMagic)

        // Filter only magic weapons
        const weaponDetailsMagic = allMagicItemDetails.filter(item => item.equipment_category && item.equipment_category.name === "Weapon")

        const weaponDetailsNormalWithFlag = weaponDetailsNormal.map(weapon => ({...weapon, isMagicItem: false}));
        const weaponDetailsMagicWithFlag = weaponDetailsMagic.map(weapon => ({...weapon, isMagicItem: true}));

        const weaponDetails = [...weaponDetailsNormalWithFlag, ...weaponDetailsMagicWithFlag];
        weaponDetails.sort((a, b) => a.name.localeCompare(b.name)); // Sort weapons alphabetically
        setData(weaponDetails)
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchWeapons()
  }, [])

  useEffect(() => {
    const filtered = data.filter(weapon => weapon.name.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredData(filtered)
  }, [searchQuery, data])

  const handlePressNormal = (weapon) => {
    navigation.navigate('Equipment', {equipmentUrl: weapon.url})
  }

  const handlePressMagic = (weapon) => {
    navigation.navigate('MagicItem', {itemUrl: weapon.url})
  }



  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weapons</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
        style={styles.searchBar}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeHolder="Search Weapons"
        ></TextInput>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.url}
        renderItem={({item}) => {
          const handlePress = item.isMagicItem ? handlePressMagic : handlePressNormal;
           return (<TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.itemDetails}>
              {item.isMagicItem ?
              <>
                <Text style={styles.itemDetail}>Magic Item: Yes</Text>
                <Text style={styles.itemDetail}>Rarity: {item.rarity.name}</Text>
                <Text style={styles.itemDetail}>Variant: {item.varient === true ? 'yes' : 'no'}</Text>
                </>
                 :
                <Text style={styles.itemDetail}>Magic Item: No</Text>}
                {item.cost && item.cost.quantity != null &&
                  <Text style={styles.itemDetail}>Cost: {item.cost.quantity} {item.cost.unit}</Text>}
                {item.range && item.range.normal != null &&
                  <Text style={styles.itemDetail}>Range: {item.range.normal}</Text>}
                {item.weight != null &&
                  <Text style={styles.itemDetail}>Weight: {item.weight}</Text>}
              </View>
            </View>
          </TouchableOpacity>
        )}}
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
    textAlign: 'center',
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
    borderWidth: 1
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