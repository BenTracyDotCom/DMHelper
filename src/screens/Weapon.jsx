import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function Weapon({ route }) {
  const { weaponUrl } = route.params;
  const [weapon, setWeapon] = useState(null);

  useEffect(() => {
    const fetchWeapon = async () => {
      try {
        const response = await fetch(`https://www.dnd5eapi.co${weaponUrl}`);
        const json = await response.json();
        setWeapon(json);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeapon();
  }, [weaponUrl]);

  if (!weapon) {
    return <ActivityIndicator />;
  }

  return (
    <View styles={styles.container}>
      <Text style={styles.title}>{weapon.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1F2937",
  },
  title: {
    fontSize: 20,
    color: "#FBBF24",
    marginBottom: 5,
    textAlign: "center",
  },
});
