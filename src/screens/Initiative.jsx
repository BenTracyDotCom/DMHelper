import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import InitiativeChar from '../features/initiative/InitiativeChar';
import { cycleGroupMode } from '../features/initiative/initiativeSlice';
import { useEffect } from 'react';
import { setInitiative, sortByInitiative } from '../features/encounter/encounterSlice';

export default function Initiative() {
  const groupModes = ['all', 'by type', 'none']
  const encounter = useSelector(state => state.encounter)
  const campaign = useSelector(state => state.campaign)
  const groupMode = useSelector(state => state.initiative.groupMode)

  const dispatch = useDispatch()

  useEffect(() => {
    encounter.chars.forEach(char => {
      dispatch(setInitiative({
        name: char.name,
        initiative: 0
      }))
    })
    dispatch(sortByInitiative())
  }, [dispatch])

  const handleGrouping = () => {
    if (groupMode === 2) {
      const firstEnemy = encounter.chars.find(char => char.type === 'enemy')
      encounter.chars.forEach(char => {
        if(char.type === 'enemy'){
          dispatch(setInitiative({
            name: char.name,
            initiative: firstEnemy.initiative ? firstEnemy.initiative : 30
          }))
        }
      })
      dispatch(cycleGroupMode())
      dispatch(sortByInitiative())
    } else if (groupMode === 0) {
      //TODO: separate enemy initiative by NAME, with last 2 characters trimmed off (goblin A, goblin B, goblin AA)
      dispatch(cycleGroupMode())
    } else {
      //TODO: give all un-rolled enemies their own initiative
      dispatch(cycleGroupMode())
    }
  }

  const handleContinue = () => {
    //TODO: either toggle tiebreak modal or navigate to encounter screen
  }

  return (

    <View style={styles.container}>
        <View style={styles.chars}>
          {!!encounter.chars && encounter.chars.map((char, i) => (
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
