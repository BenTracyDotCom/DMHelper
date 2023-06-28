import React, {useState, useEffect} from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'

export default function MagicItem ({route}) {
  const {magicItemUrl} = route.params
  const [magicItem, setMagicItem] = useState(null)

  useEffect(() => {
    const fetchMagicItem = async() => {
      try {
        const response = await fetch(`https://www.dnd5eapi.co${magicItemUrl}`)
        const json = await response.json()
        setMagicItem(json)
      } catch (error) {
        console.error(error)
      }
    }

    fetchMagicITem()
  }, [magicItem])

  if (!magicItem) {
    return <ActivityIndicator />
  }

  return (
    <View styles={styles.container}>
      <Text style={styles.title}>{magicItem.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1F2937',
  },
  title: {
    fontSize: 20,
    color: '#FBBF24',
    marginBottom: 5,
    textAlign: 'center',
  }
})