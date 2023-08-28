import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Spell from "../components/Spell";

export default function Spells() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxLevel, setMaxLevel] = useState(9);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://www.dnd5eapi.co/api/spells");
        const json = await response.json();
        let promises = json.results.map((spell) =>
          fetch(`https://www.dnd5eapi.co${spell.url}`),
        );
        let spellDetails = await Promise.all(
          promises.map((p) => p.then((resp) => resp.json())),
        );
        setData(spellDetails);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSpells();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (spell) =>
        spell.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        spell.level <= parseInt(maxLevel),
    );
    setFilteredData(filtered);
  }, [searchQuery, data, maxLevel]);

  const handlePress = (item) => {
    navigation.navigate("Spell", { spellUrl: item.url });
    // will navigate to individual spell pane
  };

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View className="h-full p-5 bg-gray-800">
      <Text className="text-2xl text-yellow-600 mb-5 text-center">Spells</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search Spells"
        ></TextInput>
        <TextInput
          style={styles.levelInput}
          onChangeText={setMaxLevel}
          value={maxLevel}
          placeholder="Max Level"
          keyboardType="numeric"
        ></TextInput>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View className="bg-white p-4 rounded-lg mb-4 shadow-lg border border-gray-300">
              <Text className="text-lg text-red-800 mb-2">{item.name}</Text>
              <View className="border-t border-gray-200 pt-2">
                <Text className="text-md text-blue-800">
                  Level: {item && item.level === 0 ? "cantrip" : item.level}
                </Text>
                <Text className="text-md text-blue-800">
                  {item.components.join(", ")}
                </Text>
                <Text className="text-md text-blue-800">
                  Casting Time: {item.casting_time}
                </Text>
                <Text className="text-md text-blue-800">
                  Concentration: {item.concentration ? "Yes" : "No"}
                </Text>
                <Text className="text-md text-blue-800">
                  Ritual: {item.ritual ? "Yes" : "No"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#1F2937",
  },
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    marginRight: 10,
  },
  levelInput: {
    width: 100,
    height: 40,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
});
