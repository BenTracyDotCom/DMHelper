import React from 'react';
import {ScrollView, Text, View, StyleSheet } from 'react-native';

export default function Monster({route}) {
  const {monster} = route.params;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.name}>{monster.name}</Text>
        <View style={styles.attributeContainer}>
          <View style={styles.attributeBox}><Text style={styles.attributeText}>Str: {monster.strength}</Text></View>
          <View style={styles.attributeBox}><Text style={styles.attributeText}>Dex: {monster.dexterity}</Text></View>
          <View style={styles.attributeBox}><Text style={styles.attributeText}>Con: {monster.constitution}</Text></View>
          <View style={styles.attributeBox}><Text style={styles.attributeText}>Int: {monster.intelligence}</Text></View>
          <View style={styles.attributeBox}><Text style={styles.attributeText}>Wis: {monster.wisdom}</Text></View>
          <View style={styles.attributeBox}><Text style={styles.attributeText}>Cha: {monster.charisma}</Text></View>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>Type: {monster.type}</Text>
          <Text style={styles.infoText}>Size: {monster.size}</Text>
          <Text style={styles.infoText}>Alignment: {monster.alignment}</Text>
          <Text style={styles.infoText}>AC: {monster.armor_class[0].value}</Text>
          <Text style={styles.infoText}>HP: {monster.hit_points}</Text>
          <Text style={styles.infoText}>Speed: {monster.speed.walk}</Text>
          <Text style={styles.infoText}>Challenge Rating: {monster.challenge_rating}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Special Abilities</Text>
        {monster.special_abilities && monster.special_abilities.map((action, index) => (
          <View key={index} style={styles.actionBox}>
            <Text style={styles.ability}>{action.name}</Text>
            <Text style={styles.description}>{action.desc}</Text>
          </View>
        ))}
      </View>
      <View style={styles.box}>
        <Text style={styles.sectionTitle}>Actions</Text>
        {monster.actions && monster.actions.map((action, index) => (
          <View key={index} style={styles.actionBox}>
            <Text style={styles.ability}>{action.name}</Text>
            <Text style={styles.description}>{action.desc}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 30,
    backgroundColor: '#2B303A', // Dark blue
  },
  box: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#414758', // Dark slate
    borderColor: '#C9A66B', // Gold
    borderWidth: 2,
    marginBottom: 4,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#E0E1DD', // Light cream color
    backgroundColor: '#5C2018', // Dark red
    borderRadius: 8,
    margin: 10,
    padding: 10,
  },
  statBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#d9a451', // Gold
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: '#d9a451', // Gold
    borderWidth: 1,
    borderRadius: 8,
    margin: 2,
    padding: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#f8f8ff',
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 14,
    color: '#f8f8ff',
  },
  infoBox: {
    flexDirection: 'column',
    padding: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#E0E1DD', // Light cream color
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E1DD', // Light cream color
  },
  actionBox: {
    marginVertical: 10,
  },
  ability: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E1DD', // Light cream color
  },
  description: {
    fontSize: 14,
    color: '#E0E1DD', // Light cream color
  },
  attributeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: ' ',// Gold
    borderRadius: 8,
    overflow: 'hidden'
  },
  attributeBox: {
    width: '16.66%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightCokor: '#C9A66B', // Gold
    borderBottomColor: '#C9A66B', // Gold
  },
  attributeText: {
    fontSize: 18,
    color: '#E0E1DD', // Light cream color
    textAlign: 'center',
  }
});
