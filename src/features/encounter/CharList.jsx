import { View, Text, TouchableOpacity } from "react-native";
import {
  nextChar,
  statusAdded,
  statusRemoved,
  hpAdded,
  hpRemoved,
  targetDestroyed,
} from "./encounterSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRoute } from "@react-navigation/native";

import Character from "./Character";

export default function CharList(props) {
  const route = useRoute();
  const encounter = useSelector((state) => state.encounter);
  const dispatch = useDispatch();

  return (
    <View>
      {encounter.chars &&
        encounter.chars.map((char, i) => (
          <Character character={char} key={i} active={i === encounter.active} />
        ))}
      {!encounter.chars && <Text>{JSON.stringify(encounter)}</Text>}
    </View>
  );
}
