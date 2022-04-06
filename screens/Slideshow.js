import { SliderBox } from "react-native-image-slider-box";
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

export default class Slideshow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require("../assets/images/ac_service.jpg"),
        require("../assets/images/clean_service.jpg"),
        require("../assets/images/plumbing_service.jpg"),
        require("../assets/images/electrician_service.jpg"), // Local image
      ],
    };
  }
  // other component code ...
  render() {
    return (
      <View style={styles.slider}>
        <SliderBox images={this.state.images} sliderBoxHeight={200} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  slider: {
    marginTop: 30,
  },
});
