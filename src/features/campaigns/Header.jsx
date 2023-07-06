import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {

  const campaign = useSelector(state => state.campaign)

  const handleLocation = () => {
    //TODO
  }

  const handleQuest = () => {
    //TODO
  }

  const handleObjective = () => {
    //TODO
  }

  const handleNPCs = () => {
    //TODO
  }

  const handleHooks = () => {
    //TODO
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.questDataRow}>
          <Text style={styles.title}>Quest:</Text>
          <TouchableOpacity style={styles.locationButton} onPress={handleQuest}>
            <Text style={styles.locationText}>{campaign.currentQuest}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.questDataRow}>
          <Text style={styles.title}>Where:</Text>
          <TouchableOpacity style={styles.locationButton} onPress={handleLocation}>
            <Text style={styles.locationText}>{campaign.location}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mapButton}>
            <Text style={styles.mapText}>Map</Text>
          </TouchableOpacity>
        </View>
          <Text style={{...styles.title, fontSize: 18}}>Objective:</Text>
        <View style={styles.questDataRow}>
          <TouchableOpacity style={styles.locationButton} onPress={handleObjective}>
            <Text style={styles.locationText}>{campaign.currentObjective}</Text>
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
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginHorizontal: 2,
    height: '100%',
  },
  title: {
    fontFamily: 'Scada',
    fontWeight: 'bold',
    fontSize: 24,
  },
  locationButton: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 15,
    backgroundColor: '#d1d5db',
    alignContent: 'center',
    justifyContent: 'center'
  },
  locationText: {
    margin: 'auto',
    fontSize: 20,
    fontFamily: 'Scada',
    textAlign:'center',
  },
  mapButton: {
    borderRadius: 10,
    backgroundColor: '#d1d5db',
    marginRight: 4
  },
  mapText: {
    margin: 'auto',
    padding: 8,
    fontSize: 20,
    fontFamily: 'Scada',
  },
  questDataRow: {
    flexDirection: 'row',
    marginHorizontal: 4,
    marginVertical: 4,
  },
  quest: {
    flexDirection: 'row',
  },
  buttonBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    maxHeight: 30,
    marginBottom: 0
  },
  button: {
    borderRadius: 30,
    backgroundColor: '#d1d5db',
    width: '30%',
    marginTop: 4
  },
  buttonText: {
    fontFamily: 'Scada',
    fontSize: 18,
    textAlign: 'center',
  }
});