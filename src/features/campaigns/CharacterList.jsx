import { View, Text, StyleSheet } from "react-native";
import Character from "./Character";
import { useSelector } from "react-redux";

export default function CharacterList() {
  const campaign = useSelector((state) => state.campaign);

  return (
    <View style={styles.container}>
      {campaign.characters &&
        campaign.characters.map((char) => (
          <Character character={char} key={char.name} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginTop: 4,
  },
});
