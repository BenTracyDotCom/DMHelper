import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleEncountersMenu } from "./encountersSlice";
import { setEncounter } from "./encounterSlice";

export default function EncounterMenu({ navigation }) {
  const dispatch = useDispatch();

  const visible = useSelector((state) => state.encounters.showEncounterModal);
  const encounters = useSelector((state) => state.encounters.encounters);

<<<<<<< HEAD
  const handleEncounter = (encounter) => {
    dispatch(setEncounter(encounter))
    dispatch(toggleEncountersMenu())
    navigation.navigate('Initiative')
    //navigation.navigate('Encounter', { name: encounter.title })
  }

  const handleAddEncounter = () => {
    navigation.navigate('EncounterBuilder')
  }


=======
  const handleEncounter = async (encounter) => {
    dispatch(setEncounter(encounter));
    dispatch(toggleEncountersMenu());
    navigation.navigate("Encounter", { name: encounter.title });
  };
>>>>>>> main

  //TODO: have list items navigate to Encounter screen and load their respective encounters

  //TODO: styling: modal card should grow to 400px and scroll after that, should start at just the size of the tiles present

  return (
    <Modal isVisible={visible} avoidKeyboard={true}>
      <View style={styles.modalBg}>
        <View style={styles.modalBase}>
          <View style={styles.modalCard}>
            <ScrollView contentContainerStyle={styles.listContainer}>
<<<<<<< HEAD
              {!!encounters.length && encounters.map((encounter, index) => (
                <TouchableOpacity style={styles.encounter} key={`encounter${index}`} onPress={() => handleEncounter(encounter)}>
                  <Text style={styles.text}>{encounter.title}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.encounter} onPress={handleAddEncounter}>
                <Text style={styles.text}>+</Text>
              </TouchableOpacity>
=======
              {!!encounters.length &&
                encounters.map((encounter, index) => (
                  <TouchableOpacity
                    style={styles.encounter}
                    key={`encounter${index}`}
                    onPress={() => handleEncounter(encounter)}
                  >
                    <Text style={styles.text}>{encounter.title}</Text>
                  </TouchableOpacity>
                ))}
>>>>>>> main
            </ScrollView>
          </View>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(toggleEncountersMenu())}>
              <Text>X</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBg: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalBase: {
    backgroundColor: "#d1d5db",
    borderRadius: 12,
    width: 250,
    height: 400,
    marginHorizontal: "auto",
  },
  modalCard: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 16,
    maxHeight: 400,
    width: "90%",
  },
  listContainer: {
    flexGrow: 1,
  },
  encounter: {
<<<<<<< HEAD
    backgroundColor: 'white',
    borderRadius: 12,
    borderStyle: 'solid',
    borderColor: 'red',
    borderWidth: 2,
  },
  text: {
    fontFamily: 'Scada',
    textAlign: 'center',
=======
    backgroundColor: "white",
    borderRadius: 12,
  },
  text: {
    fontFamily: "Scada",
>>>>>>> main
  },
  button: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#ef4444",
  },
});
