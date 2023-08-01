import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Dieroll() {

  return(
    <View style={styles.box}>
     <View style={styles.dieContainer}>
      <TouchableOpacity style={styles.die}>
        <Text style={styles.dieFace}>d4</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.die}>
        <Text style={styles.dieFace}>d6</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.die}>
        <Text style={styles.dieFace}>d8</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.die}>
        <Text style={styles.dieFace}>d10</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.die}>
        <Text style={styles.dieFace}>d12</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.die}>
        <Text style={styles.dieFace}>d20</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.die}>
        <Text style={styles.dieFace}>d100</Text>
      </TouchableOpacity>
     </View>
    </View>
  )
}

const styles = StyleSheet.create({
  box:{
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 2,
    flex: 1
  },
  dieContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
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