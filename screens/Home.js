import React, { useState, useEffect } from "react";
import { StyleSheet, View, BackHandler, Alert } from "react-native";
import { Text } from 'react-native';
import Search from "./Search";
import Slideshow from "./Slideshow";
import Services from "./Services";
import { db } from "../firebase";
import * as Location from 'expo-location';


export default function Home({navigation}) {
  const userNumber = global.phoneNum;
  global.navigation = navigation;

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
    db.collection("User").where("phone_no", "==", userNumber)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {

          const latitude = doc.data().location.latitude;
          const longitude = doc.data().location.longitude;
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
          GetCurrentLocation();
        })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      });
  };
  //GetCurrentLocation();


  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Search placeholderText="Your Location" value={displayCurrentAddress} />
        <Slideshow />
        <Services navigation={navigation}/>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  screen: {
    marginTop: 50,
  },
});
