import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, BackHandler, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from 'expo-location';
import { db } from "../firebase";

export default function Home() {
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );

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
  {
    db.collection("User").where("phone_no", "==", "+913333333335")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          const latitude = doc.data().location.latitude;
          const longitude = doc.data().location.longitude;
          console.log(latitude, longitude);
          const GetCurrentLocation = async () => {
            let response = await Location.reverseGeocodeAsync({
              latitude,
              longitude,
            });
            for (let item of response) {
              let address = `${item.name}, ${item.postalCode}, ${item.city}`;

              setDisplayCurrentAddress(address);
            }
            
            
            
          }
          console.log("adfadfadf");
          console.log("Address is: ", displayCurrentAddress);
          GetCurrentLocation();
        })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      });
  };

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
