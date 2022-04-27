import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Chat() {
  return (
    <View style={styles.chats}>
      <Text>Chatting...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  chats: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
