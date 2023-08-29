import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { showPrefs } from "./preferencesSlice";
import { useDispatch } from "react-redux";

export default function PrefsButton() {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity onPress={() => dispatch(showPrefs())}>
      <Text>⚙︎</Text>
    </TouchableOpacity>
  );
}
