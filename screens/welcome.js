import React from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { globalStyles } from "../styles/globalStyles";

export default function Welcome({ navigation }) {
  return (
    <View style={globalStyles.container}>
      <LinearGradient
        //   colors={['#9c9c9c','#6E6E6E', '#404040' ]}
        colors={["#009ffd", "#2a2a72"]}
        style={globalStyles.linearGradient}
      >
        <View style={globalStyles.content}>
          <View style={globalStyles.logo}>
            <Image
              style={{ width: 90, height: 90, top: 12 }}
              source={require("../assets/images/Mendit-Logo.png")}
            />
            <Text style={globalStyles.logoText}> Mendit </Text>
          </View>

          <View style={globalStyles.textContainer}>
            <Text style={globalStyles.mainText}>
              {" "}
              All services on your fingertips.{" "}
            </Text>
          </View>

          <View style={globalStyles.buttons}>
            <TouchableOpacity
              style={globalStyles.button1}
              onPress={() => {
                console.log(navigation);
                navigation.navigate("Login");
              }}
            >
              <Text style={globalStyles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={globalStyles.button2}
              onPress={() => navigation.navigate("SignUpAs")}
            >
              <Text style={globalStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <StatusBar style="auto" />
    </View>
  );
}
