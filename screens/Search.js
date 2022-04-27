import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import React, { useState } from "react";
import { Feather, Entypo } from "@expo/vector-icons";

export default function Search({ placeholderText, icon, value }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);

  return (
    <View style={styles.header}>
      <View style={styles.searchBar}>
        {/* search Icon */}
        <Feather
          name={icon}
          size={20}
          color="black"
          style={{ paddingHorizontal: 10 }}
        />
        {/* Search field */}
        <TextInput
          style={styles.input}
          placeholder={placeholderText}
          value={value}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={18}
            color="black"
            style={{ right: 7 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
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
