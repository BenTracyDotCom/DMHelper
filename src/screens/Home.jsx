import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../features/counter/counterSlice";
import Counter from "../features/counter/Counter";

export default function Home({ navigation }) {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncreament = () => {
    dispatch(increment());
  };

  const handleDecreament = () => {
    dispatch(decrement());
    navigation.navigate("Spells");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title_text}>Current mission:</Text>
      <Text className="text-2xs"> To take over the world!!!</Text>
      <Counter />
      {/* <TouchableOpacity onPress={handleIncreament} style={styles.btn}>
        <Text style={styles.btn_text}> Increment </Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={handleDecreament}
        style={{ ...styles.btn, backgroundColor: "#6e3b3b" }}
        // className="p-10 m-10"
      >
        <Text className="text-white"> Spells </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "column",
    padding: 50,
  },
  title_text: {
    fontSize: 40,
    fontWeight: "900",
    marginBottom: 55,
  },
  counter_text: {
    fontSize: 35,
    fontWeight: "900",
    margin: 15,
  },
  btn: {
    backgroundColor: "#086972",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  btn_text: {
    fontSize: 23,
    color: "#fff",
  },
});

//TODO: Replace all stylesheets with Tailwind classes (this is 2023)
