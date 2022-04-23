import React, { useEffect } from "react";
import { StyleSheet, View, Text, BackHandler, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Home() {
  useEffect(() => {
    const backButtonPress = () => {
      Alert.alert("EXIT", "Are you sure you want to exit?", [
        {
          text: "NO",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backButtonPress
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <MaterialIcons name="event-note" size={58} color="gray" />
      <Text style={{ fontSize: 22 }}>Welcome, New jobs will be shown here</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {},
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
