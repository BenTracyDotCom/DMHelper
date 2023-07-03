import React, {useState, useEffect} from 'react'
import {ScrollView, View, Text, StyleSheet, ActivityIndicator} from 'react-native'

export default function MagicItem ({route}) {
  const {itemUrl} = route.params
  const [magicItem, setMagicItem] = useState(null)

  useEffect(() => {
    const fetchMagicItem = async() => {
      try {
        const response = await fetch(`https://www.dnd5eapi.co${itemUrl}`)
        const json = await response.json()
        setMagicItem(json)
      } catch (error) {
        console.error(error)
      }
    }

    fetchMagicItem()
  }, [magicItem])

  if (!magicItem) {
    return <ActivityIndicator />
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>{magicItem.name}</Text>
      <View style={styles.contentContainer}>
        <Text style={styles.details}>Equipment Category: {magicItem.equipment_category.name}</Text>
        <Text style={styles.details}>Rarity: {magicItem.rarity.name}</Text>
        <Text style={styles.details}>Variant: {magicItem.varient === true ? 'yes' : 'no'}</Text>
        <View style={styles.lineStyle}/>
        {magicItem.variants.length > 0 &&
        <>
        <Text style={styles.variantLabel}>Variants: </Text>
        {magicItem.variants.map((variant, index) => (
            <Text key={index} style={styles.variant}>{variant.name}</Text>
          ))}
        </>
      }
      <View style={styles.lineStyle}/>
      <Text style={styles.descriptionLabel}>Description: </Text>
        {magicItem.desc.map((desc, index) => (
          <Text key={index} style={styles.description}>{desc}</Text>
        ))}

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
  },
  description: {
    fontSize: 14,
    color: 'red', // Updated to red color
    marginVertical: 3,
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:10,
  },
  variant: {
    fontSize: 14,
    color: '#AA6C39', // U
    marginVertical: 3,
  },
  variantLabel: {
    fontSize: 18,
    color: '#AA6C39',
    marginTop: 10
  },
  descriptionLabel: {
    fontSize: 18,
    color: 'red',
    marginTop: 10
  }
})

