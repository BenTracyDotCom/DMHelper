import{ View, Text, StyleSheet } from 'react-native';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import InitiativeChar from '../features/initiative/InitiativeChar';

export default function Initiative() {
  const groupModes = ['all','by type','none']
  const encounter = useSelector(state => state.encounter)
  const campaign = useSelector(state => state.campaign)

  return (
    <View style={styles.container}>
      <View style={styles.column}>
{!!encounter.chars && encounter.chars.map((char, i) => (
  <InitiativeChar char={char} key={i}/>
)) }
      </View>
      <View style={styles.column}>
        <Text>Options, notes, die go here</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    paddingHorizontal: 10,
  },
})
