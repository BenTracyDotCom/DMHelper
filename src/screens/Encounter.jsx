import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CharList from "../features/encounter/CharList";
import DieRoll from "../features/dieroll/DieRoll";
import Header from "../features/encounter/Header";

export default function Encounter(props) {
  return (
    <View style={styles.container}>
      <Header />
      <CharList />
      <DieRoll />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
