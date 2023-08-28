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
import MagicItem from "./MagicItem";

export default function MagicItems() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMagicItems = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://www.dnd5eapi.co/api/magic-items");
        const json = await response.json();
        const promises = json.results.map((item) =>
          fetch(`https://www.dnd5eapi.co${item.url}`).then((resp) =>
            resp.json(),
          ),
        );

        const allItemDetails = await Promise.all(promises);
        // allItemDetails.sort((a, b) => a.name.localeCompare(b.name))
        setData(allItemDetails);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMagicItems();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const handlePress = (item) => {
    navigation.navigate("MagicItem", { itemUrl: item.url });
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Magic Items</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.serachBar}
          onChangeText={setSearchQuery}
          value={searchQuery}
          placeholder="Search Magic Items"
        />
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.itemDetails}>
                <Text style={styles.itemDetail}>
                  {item.equipment_category.name}
                </Text>
                <Text style={styles.itemDetail}>{item.rarity.name}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "#1F2937",
  },
  title: {
    fontSize: 20,
    color: "#FBBF24",
    marginBottom: 5,
    textAlign: "center",
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
  itemContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: "#D1D5DB",
    borderWidth: 1,
  },
  itemName: {
    fontSize: 16,
    color: "#DC2626",
    marginBottom: 2,
  },
  itemDetails: {
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    paddingTop: 2,
  },
  itemDetail: {
    fontSize: 14,
    color: "#1D4ED8",
  },
});
