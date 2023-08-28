import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Tiebreak from '../features/initiative/Tiebreak';
import InitiativeChar from '../features/initiative/InitiativeChar';
import { useEffect } from 'react';
import { setInitiative, sortByInitiative, setAllEnemies, setEnemiesByType, cycleGroupMode, toggleTiebreak, validateInitiative, autoResolveTies, setActiveTie } from '../features/encounter/encounterSlice';

export default function Initiative({ navigation }) {
  const groupModes = ['all', 'by type', 'none']
  const { chars, groupMode, tiebreak, ties } = useSelector(state => state.encounter)

  const dispatch = useDispatch()
  const encounter = useSelector(state => state.encounter)

  useEffect(() => {
    chars.forEach(char => {
      dispatch(setInitiative({
        name: char.name,
        initiative: char.type === 'enemy' ? -1 : 0
      }))
    })
    dispatch(sortByInitiative())
  }, [dispatch])

  useEffect(() => {
    //dispatch(autoResolveTies())
    if (JSON.stringify(ties) !== JSON.stringify({})) {
      dispatch(setActiveTie(Object.keys(ties)[0]))
      dispatch(toggleTiebreak())
      console.log(ties, 'ties')
      //dispatch(toggleTiebreak())
    }
  }, [ties] )

  const handleGrouping = () => {
    if (groupMode === 2) {
      const firstEnemy = chars.find(char => char.type === 'enemy')
      dispatch(setAllEnemies(-1))
      dispatch(cycleGroupMode())
    } else if (groupMode === 0) {
      const found = {}
      let currentInit = -1
      chars.forEach(char => {
        const toMatch = char.name.slice(0, 3)
        if (char.type === 'enemy' && !found[toMatch]) {
          found[toMatch] = true
          dispatch(setEnemiesByType({
            name: char.name,
            init: currentInit
          }))
          currentInit--
        }
      })
      dispatch(cycleGroupMode())
    } else {
      dispatch(cycleGroupMode())
    }
  }

  const handleContinue = () => {
    //TODO: either toggle tiebreak modal or navigate to encounter screen
    dispatch(validateInitiative())

    //TODO: VALIDATE before navigating
    // dispatch(sortByInitiative())
    // navigation.navigate('Encounter', { name: encounter.title })
  }

  return (

    <View style={styles.container}>
      {tiebreak && <Tiebreak navigation={navigation} />}
      <View style={styles.chars}>
        {!!chars && chars.map((char, i) => (
          <InitiativeChar char={char} key={i} />
        ))}
      </View>
      <View style={styles.aux}>
        <Text>Group enemies by:</Text>
        <TouchableOpacity onPress={handleGrouping} style={styles.groupBtn}>
          <Text>{groupModes[groupMode]}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonBar}>
        <TouchableOpacity onPress={handleContinue} style={styles.continue}>
          <Text style={styles.continueText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  scroll: {
    flex: 1,
  },
  chars: {
    flex: 2,
  },
  aux: {
    flex: 1,
  },
  groupBtn: {
    backgroundColor: 'cyan',
  },
  buttonBar: {
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
  },
  continue: {
    backgroundColor: 'green',
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 10,
    paddingHorizontal: 10,
    textAlignVertical: 'top',
    marginBottom: 5
  },
  continueText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlignVertical: 'top',
    paddingBottom: 2
  },
})
