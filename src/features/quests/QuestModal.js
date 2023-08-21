// QuestModal.js
import React from 'react';
import { Modal, FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function QuestModal({ isVisible, onClose, quests }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Quests</Text>
          <FlatList
            data={quests}
            renderItem={({ item }) => <Text>{item.title}</Text>}
            keyExtractor={(item) => item.title}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
