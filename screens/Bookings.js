import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

import Search from "./Search";
import FilterSort from "./FilterSort";
import { db } from "../firebase";

export default function Booking() {
  return (
    <View style={styles.Bookings}>
      <Search placeholderText="Search for a previous booking" icon="search" />
      <FilterSort />
    </View>
  );
}

const styles = StyleSheet.create({
  Bookings: {
    marginTop: 50,
  },
});
