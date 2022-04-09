import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Shadow } from "react-native-shadow-2";

export default function Services() {
  return (
    <View style={styles.container}>
      <Shadow distance={7} startColor={"#ddd"} radius={15}>
        <View style={styles.content}>
          <Text
            style={{
              fontSize: 15,
              padding: 8,
              paddingHorizontal: 12,
              fontWeight: "bold",
            }}
          >
            Our Services
          </Text>

          <View style={styles.allservices}>
            <TouchableOpacity
              style={styles.servicebox}
              onPress={() => alert("AC Service")}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/ac.png")}
              />
              <Text style={{ fontSize: 10 }}>AC service</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.servicebox}
              onPress={() => alert("Electrician")}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/electric.png")}
              />
              <Text style={{ fontSize: 10 }}>Electrician</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.servicebox}
              onPress={() => alert("Carpentry")}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/carpenter.png")}
              />
              <Text style={{ fontSize: 10 }}>Carpenter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.servicebox}
              onPress={() => alert("Home Paint")}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/paint.png")}
              />
              <Text style={{ fontSize: 10 }}>Painter</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.allservices}>
            <TouchableOpacity
              style={styles.servicebox}
              onPress={() => alert("Plumber")}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/plumber.png")}
              />
              <Text style={{ fontSize: 10 }}>Plumber</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.servicebox}
              onPress={() => alert("Cleaner")}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/cleaner.png")}
              />
              <Text style={{ fontSize: 10 }}>Cleaner</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.servicebox}
              onPress={() => alert("Cleaner")}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/pesticide.png")}
              />
              <Text style={{ fontSize: 10 }}>Pest Control</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.servicebox}
              onPress={() => alert("Masonry")}
            >
              <Image
                style={styles.image}
                source={require("../assets/images/masonry.png")}
              />
              <Text style={{ fontSize: 10 }}>Mason</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Shadow>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
  },
  allservices: {
    marginVertical: 16,
    flexDirection: "row",
    width: "85%",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  servicebox: {
    alignItems: "center",
  },
});
