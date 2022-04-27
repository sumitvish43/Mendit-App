import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, BackHandler, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from 'expo-location';

export default function Home() {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
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

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync();
    const temp = constructor({latitude:coords.latitude, longitude:coords.longitude})
    //  const temp = constructor({coords.latitude, coords.longitude})

    // coordinates: new db.GeoPoint(Number(coords.latitude), Number(coords.longitude))
    console.log("co",temp)
    if (coords) {
      const { latitude, longitude } = coords;
      alert("Saving Location")
          // create new thread using firebase & firestore
          //const db = firebase.firestore();
          db.collection("User").add({
            latitude: latitude,
            longitude: longitude,
            identity: "test location5",
            location_geopoint: temp, 
            
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
      
    }
  };

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
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
