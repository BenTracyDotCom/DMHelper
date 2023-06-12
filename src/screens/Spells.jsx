import React, {useState, useEffect, useCallback} from 'react'
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Spell from '../components/Spell'

export default function Spells() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSpells = async() => {
      setLoading(true);
      const response = await fetch('https://www.dnd5eapi.co/api/spells')
      const json = await response.json()
      let promises = json.results.map(spell => fetch(`https://www.dnd5eapi.co${spell.url}`));
      let spellDetails = await Promise.all(promises.map(p => p.then(resp => resp.json())))
      setData(spellDetails)
      setLoading(false)
    }

    fetchSpells()
  }, [])

  if (loading) {
  return <ActivityIndicator/>
 }
  return (
    <View>
      <Text className="m-auto text-blue-700">Spells</Text>
      <FlatList
      data={data}
      keyExtractor={(item) => item.index}
      renderItem={({item}) => (
        <View style={{margin: 10}}>
          <Text style={{fontSize: 20}}>{item.name}</Text>
          <Text style={{fontSize:16, color: 'grey'}}>{item.level}</Text>
          <Text style={{fontSize: 16, color: 'grey'}}>{item.components.join(', ')}</Text>
        </View>
      )}
      ></FlatList>
    </View>
  )
}