import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Monster from "./Monster";

export default function Monsters() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [maxChallenge, setMaxChallenge] = useState(30);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMonsters = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://www.dnd5eapi.co/api/monsters");
        const json = await response.json();
        const promises = json.results.map((monster) =>
          fetch(`https://www.dnd5eapi.co${monster.url}`),
        );
        const monsterDetails = await Promise.all(
          promises.map((p) => p.then((resp) => resp.json())),
        );
        setData(monsterDetails);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMonsters();
  }, []);

  useEffect(() => {
    const filtered =
      data &&
      data.filter(
        (monster) =>
          monster.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          monster.challenge_rating <= maxChallenge,
      );
    setFilteredData(filtered);
  }, [searchQuery, data, maxChallenge]);

  const handlePress = (item) => {
    navigation.navigate("Monster", { monster: item });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View className="h-full p-5 bg-gray-800">
      <Text className="text-2xl text-white mb-5 text-center">Monsters</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search Monsters"
        ></TextInput>
        <TextInput
          style={styles.challengeInput}
          onChangeText={(value) => {
            if (!isNaN(value)) {
              setMaxChallenge(value);
            }
          }}
          value={maxChallenge}
          placeholder="max CR"
          keyboardType="numeric"
        ></TextInput>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View className="bg-white b-p rounded-lg mb-4 shadow-lg border border-gray-300">
              <Text className="text-lg text-red-800 mb-2 ml-2">
                {item.name}
              </Text>
              <View className="border-t border-gray-200 pt-2">
                <Text className="text-md text-blue-800 ml-2 mb-2">
                  CR: {item.challenge_rating}
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
  challengeInput: {
    width: 100,
    height: 40,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
});
