import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { Shadow } from "react-native-shadow-2";
import LinearGradient from "react-native-linear-gradient";

export default function FilterSort() {
  return (
    <View style={styles.shadow}>
      <Shadow distance={5} startColor={"#ddd"} radius={10}>
        <View style={styles.container}>
          <TouchableOpacity
            style={[
              styles.box,
              { borderRightWidth: 1, borderRightColor: "#eee" },
            ]}
          >
            <FontAwesomeIcon name="filter" size={24} color="#007AFF" />
            <Text style={{ fontSize: 18, marginLeft: 12 }}>Filter</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.box,
              { borderLeftWidth: 1, borderLeftColor: "#eee" },
            ]}
          >
            <FontAwesomeIcon
              name="sort-amount-desc"
              size={22}
              color="#007AFF"
            />
            <Text style={{ fontSize: 18, marginLeft: 12 }}>Sort</Text>
          </TouchableOpacity>
        </View>
      </Shadow>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    marginTop: 18,
    alignSelf: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  box: {
    flexDirection: "row",
    padding: 14,
    paddingHorizontal: 44,
    justifyContent: "space-between",
  },
});
