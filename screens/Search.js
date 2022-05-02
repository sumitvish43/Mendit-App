import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import React, { useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";

export default function Search({ placeholderText, value }) {
  // const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.searchBar}>
        {/* search Icon */}
        <Feather
          name="map-pin"
          size={20}
          color="black"
          style={{ paddingHorizontal: 10 }}
        />
        {/* Search field */}
        <TextInput
          style={styles.input}
          placeholder={placeholderText}
          value={value}
          // onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    left: 16,
  },
  searchBar: {
    marginTop: 10,
    padding: 10,
    flexDirection: "row",
    width: "90%",
    backgroundColor: "#eee",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    fontSize: 15,
    width: "90%",
  },
});
