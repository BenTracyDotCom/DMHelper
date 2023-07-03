import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

export default function Header() {

  const campaign = useSelector(state => state.campaign)

  const handleLocation = () => {
    //TODO
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Where:</Text>
        <TouchableOpacity style={styles.locationButton} onPress={handleLocation}>
          <Text style={styles.locationText}>{campaign.location}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapText}>Map</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 2,
    marginTop: 2,
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
    borderRadius: 10,
    backgroundColor: '#d1d5db',
  },
  locationText: {
    margin: 'auto',
    padding: 8,
    fontSize: 20,
    fontFamily: 'Scada',
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
});