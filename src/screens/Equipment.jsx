import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, ActivityIndicator, StyleSheet} from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function Equipment() {
  const route = useRoute()
  const { equipmentUrl } = route.params;
  const [equipmentData, setEquipmentData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEquipmentData = async() => {
      try {
        const response = await fetch(`https://www.dnd5eapi.co${equipmentUrl}`)
        const data = await response.json()
        setEquipmentData(data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      }
    }

    fetchEquipmentData()
  }, [])

  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>{equipmentData.name}</Text>
      <View style={styles.contentContainer}>
        {equipmentData.equipment_category &&
          <Text style={styles.details}>{`Category: ${equipmentData.equipment_category.name}`}</Text>}
        {equipmentData.gear_category &&
          <Text style={styles.details}>{`Gear Category: ${equipmentData.gear_category.name}`}</Text>}
        <Text style={styles.details}>{`Cost: ${equipmentData.cost.quantity} ${equipmentData.cost.unit}`}</Text>
        <Text style={styles.details}>{`Weight: ${equipmentData.weight}`}</Text>
        {equipmentData.desc && equipmentData.desc.length > 0 &&
          <Text style={styles.details}>{`${equipmentData.desc.join(', ')}`}</Text>}
        {equipmentData.special && equipmentData.special.length > 0 &&
          <Text style={styles.details}>{`Special: ${equipmentData.special.join(', ')}`}</Text>}
        {equipmentData.contents && equipmentData.contents.length > 0 &&
          <Text style={styles.details}>{`Contents: ${equipmentData.contents.map(content => content.name).join(', ')}`}</Text>}
        {equipmentData.properties && equipmentData.properties.length > 0 &&
          <Text style={styles.details}>{`Properties: ${equipmentData.properties.map(property => property.name).join(', ')}`}</Text>}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1F2937', // A deeper color for contrast
  },
  title: {
    fontSize: 30,
    color: '#FBBF24',
    marginBottom: 20,
    textAlign: 'center'
  },
  contentContainer: {
    backgroundColor: '#ffffff',
    padding: 20,  // More padding
    borderRadius: 10,  // More rounded corners
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderColor: '#e2e8f0',
    borderWidth: 1,
  },
  details: {
    fontSize: 16,
    color: '#1D4ED8',
    marginVertical: 5, // Some margin for separation
  }
})
