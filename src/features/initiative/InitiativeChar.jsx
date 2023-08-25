import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default function InitiativeChar({char}) {
  const campaign = useSelector(state => state.campaign)
  const encounter = useSelector(state => state.encounter)

  return (
    <View>
      <Text>
        Character
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  
})