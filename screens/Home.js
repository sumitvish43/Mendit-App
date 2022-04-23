import React from "react";
import { StyleSheet, View } from "react-native";

import Search from "./Search";
//import Slideshow from "./Slideshow";
import Services from "./Services";

export default function Home() {
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
