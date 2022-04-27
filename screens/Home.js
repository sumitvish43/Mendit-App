import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler, Alert } from "react-native";

import Search from "./Search";
//import Slideshow from "./Slideshow";
import Services from "./Services";

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
    <View style={styles.screen}>
      <View style={styles.container}>
        <Search placeholderText="Search for services near you" />
        {/*<Slideshow />*/}
        <Services />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    marginTop: 50,
  },
});
