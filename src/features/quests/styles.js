import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    maxHeight: '60%',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "center",
  },
  objective: {
    marginLeft: 20,
    fontSize: 16,
  },
  addQuestContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    padding: 10,
    height: 40,
  },
  questInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding:  10,
    height: 20,
  },
  addButton: {
    backgroundColor: '#d1d5db',
    padding: 5,  // Reduced padding to make the button smaller
    borderRadius: 5,
    height: 20,  // Adjusted height to align with the text field
    justifyContent: 'center', // Center the text vertically within the button
  },
  addButtonText: {
    fontSize: 16,
    color: 'blue',
    height: 20,
    justifyContent: 'center',
  }
});
