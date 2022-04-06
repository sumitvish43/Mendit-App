import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Profile() {
  return (
    <View style={styles.profile}>
      <Text>My Profile...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  profile: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
