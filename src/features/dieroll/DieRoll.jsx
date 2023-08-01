import { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

export default function Dieroll() {

  const [showResult, setShowResult] = useState(false);
  const [show20s, setShow20s] = useState(false);
  const [result, setResult] = useState(0)

  const handleNon20 = (die) => {
    let num = Math.ceil(Math.random() * die)
    console.log(num)
  }

  const handle20 = () => {
    let num = Math.ceil(Math.random() * 20)
    console.log(num)
  }

  const non20s = [4, 6, 8, 10, 12]

  return (
    <View style={styles.box}>
      {showResult && 
      <View>
        <Text style={styles.result}>Result:</Text>  
      </View>}
      <View style={styles.dieContainer}>
        {non20s.map(die => (
          <TouchableOpacity style={styles.die} onPress={() => handleNon20(die)} key={die}>
            <Text style={styles.dieFace}>{`d${die}`}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.die} onPress={handle20}>
          <Text style={styles.dieFace}>d20</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 2,
    flex: 1
  },
  resultBox: {

  },
  result: {
    
  },
  dieContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    flex: 1,
    width: '100%',
    // padding: 10,
    backgroundColor: 'gray',
    bottom: 0
  },
  die: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dieFace: {
    fontFamily: 'Scada-Bold',
    color: 'white'
  },
})