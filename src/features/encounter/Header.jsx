import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { nextChar } from './encounterSlice';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {

  const encounter = useSelector((state) => state.encounter)
  const dispatch = useDispatch()

  const advance = () => {
      dispatch(nextChar())
  }
  

  return (
    <View>
            <Text className="mx-auto pt-3 font-[Scada-Bold] text-2xl">{encounter.title}</Text>
            <Text className="mx-auto pb-2">{`Total XP: ${encounter.xpEarned}`}</Text>
    </View>
  )
}