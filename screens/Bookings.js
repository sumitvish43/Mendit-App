import React from "react";
import { StyleSheet, View } from "react-native";

import Search from "./Search";
import FilterSort from "./FilterSort";

export default function Booking() {
  return (
    <View style={styles.Bookings}>
      <Search placeholderText="Search for a previous booking" />
      <FilterSort />
    </View>
  );
}
const styles = StyleSheet.create({
  Bookings: {
    marginTop: 50,
  },
});