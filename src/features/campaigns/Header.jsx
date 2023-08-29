import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  currentQuestUpdated,
  setCurrentObjectiveIndex,
  nextObjective,
  previousObjective,
} from "../../features/campaigns/campaignSlice.js";

export default function Header({toggleQuestModal}) {
  const dispatch = useDispatch();

  const { location, currentObjective, maps } = useSelector(
    (state) => state.campaign,
  );
  const currentQuest = useSelector((state) => state.campaign.currentQuest);

  const campaignState = useSelector((state) => state.campaign);
  const currentQuestData = useSelector((state) =>
    state.campaign.quests.find(
      (quest) => quest.title === state.campaign.currentQuest,
    ),
  );
  const currentObjectiveIndex = campaignState.currentObjectiveIndex;

  const handleLocation = () => {
    //TODO
  };

  const handleQuest = () => {
    toggleQuestModal()
  };

  const handlePreviousObjective = () => {
    dispatch(previousObjective());
  };

  const handleNextObjective = () => {
    dispatch(nextObjective());
  };

  const handleObjective = () => {
    toggleQuestModal()
  };

  const handleNPCs = () => {
    //TODO
  };

  const handleHooks = () => {
    //TODO
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.questDataRow}>
          <Text style={styles.title}>Where:</Text>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleLocation}
          >
            <Text style={styles.locationText}>{location}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapText}>Map</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.questDataRow}>
          <Text style={styles.title}>Quest:</Text>
          <TouchableOpacity style={styles.locationButton} onPress={handleQuest}>
            <Text style={styles.locationText}>{currentQuest}</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ ...styles.title, fontSize: 18 }}>Objective:</Text>
        <View style={styles.questDataRow}>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={handleObjective}
          >
            <Text style={styles.locationText}>
              {currentQuestData && currentObjectiveIndex !== undefined
                ? currentQuestData.objectives[currentObjectiveIndex]
                : "None"}
            </Text>
            {/* <View style={styles.objectiveButtonsContainer}>
            <TouchableOpacity
              style={styles.objectiveButton}
              onPress={handlePreviousObjective}
            >
              <Text style={styles.objectiveButtonText}>Previous Objective</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.objectiveButton}
              onPress={handleNextObjective}
            >
              <Text style={styles.objectiveButtonText}>Next Objective</Text>
            </TouchableOpacity>
          </View> */}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonBar}>
          <TouchableOpacity style={styles.button} onPress={handleNPCs}>
            <Text style={styles.buttonText}>NPCs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleHooks}>
            <Text style={styles.buttonText}>Hooks</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 230,
    flexDirection: "column",
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 2,
    height: "100%",
  },
  title: {
    fontFamily: "Scada",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 10,
  },
  locationButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 15,
    backgroundColor: "#d1d5db",
    alignContent: "center",
    justifyContent: "center",

  },
  locationText: {
    margin: "auto",
    fontSize: 20,
    fontFamily: "Scada",
    textAlign: "center",
  },
  mapButton: {
    borderRadius: 10,
    backgroundColor: "#d1d5db",
    marginRight: 4,
  },
  mapText: {
    margin: "auto",
    padding: 8,
    fontSize: 20,
    fontFamily: "Scada",
  },
  questDataRow: {
    flexDirection: "row",
    marginHorizontal: 4,
    marginVertical: 4,
    paddingVertical: 10,
    marginBottom: 15,
  },
  quest: {
    flexDirection: "row",
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    borderRadius: 30,
    backgroundColor: "#d1d5db",
    width: "40%",
    justifyContent: 'center',
    marginTop: 4,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontFamily: "Scada",
    fontSize: 20,
    textAlign: "center",
  },
  objectiveButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  objectiveButton: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  objectiveButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});
