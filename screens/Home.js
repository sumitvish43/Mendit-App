import React, { useEffect } from "react";
import { StyleSheet, View, BackHandler, Alert, Text } from "react-native";

import Search from "./Search";
import Slideshow from "./Slideshow";
import Services from "./Services";
import navigation from "../routes/homeStack";

export default function Home({ navigation }) {
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
<<<<<<< Updated upstream
        <Search placeholderText="Your Location" icon="map-pin" />
=======
        <Search placeholderText={displayCurrentAddress} />
>>>>>>> Stashed changes
        <Slideshow />
        <Services navigation={navigation} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    marginTop: 50,
  },
});
