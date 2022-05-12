import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  BackHandler,
  Alert, ToastAndroid, Platform, AlertIOS
} from "react-native";
import { db, auth } from "../firebase";
import * as Location from 'expo-location';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Profile({ navigation, mobile }) {

  const [userName, setuserName] = React.useState("Anonymous");

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)

  const locn = constructor({ latitude: 0, longitude: 0 })
  const [currCoords, setCurrCoords] = useState(locn)
  const [docid, setDocid] = useState("temp")
  const numberFinal = global.phoneNum;

  const editProfile = () => {
    alert("Edit Profile", "tt");
  };
  const myRatings = () => {
    Alert.alert("Rate 5 star", "You can rate our App on Play Store!");
  };
  const aboutUs = () => {
    Alert.alert("About", "Mendit helps people finding good handymen and workers around them. One can request a handyman and get his/her contact number.");
    const user1 = auth.currentUser;
    console.log(user1);
  };
  const settings = () => {
    
    alert("Settings");
    

  }
  const logOut = () => {
    Alert.alert("LOG OUT", "Are you sure you want to log out?", [
      {
        text: "NO",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => navigation.navigate("Welcome") },
    ]);
  };

  const locationSetter = () => {

    const signup = () => {
      //console.log("inside signup");
      db.collection("Handyman")
        .where("phone_no", "==", numberFinal)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setDocid(doc.id);
            console.log(docid);
          });
          
          if (querySnapshot.docs.length) {
            db.collection("Handyman")
              .doc(docid)
              .update({
                    location:currCoords,
                  }).then(function() {
                    console.log("not a Handyman");
                  }).catch((error) => {
                    console.error("Error adding document: ", error);
            
          });

          }
          else {
            db.collection("User")
              .where("phone_no", "==", numberFinal)
              .get()
              .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  setDocid(doc.id);
                  console.log(docid);
                });
                if (querySnapshot.docs.length) {
                  db.collection("User")
                    .doc(docid)
                    .update({
                          location:currCoords,
                        }).then(function() {
                          console.log("not a Handyman, nor a user");
                        }).catch((error) => {
                          console.error("Error adding document: ", error);
                  
                });
      
                }
                else {
                  alert("error in updating location");
                  console.log("error in updating location");
                }
              });
          }
          
        })
      // db.collection("User")
      //   .doc("wS0836I7xEjgZjZDeyc2")
      //   .update({
      //         location:currCoords,
      //       }).then(function() {
      //         console.log("Frank food updated");
      //       }).catch((error) => {
      //         console.error("Error adding document: ", error);
      //     });

          
      }


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
      const temp = constructor({ latitude: coords.latitude, longitude: coords.longitude })
      //  const temp = constructor({coords.latitude, coords.longitude})

      // coordinates: new db.GeoPoint(Number(coords.latitude), Number(coords.longitude))

      if (coords) {
        //const { latitude, longitude } = coords;
        const msg = "Saving Location"
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
          AlertIOS.alert(msg);
        }
        setCurrCoords(temp)
      }
    };

    const CheckIfLocationEnabled2 = async () => {
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
    console.log("initial location: ", currCoords, numberFinal);
    CheckIfLocationEnabled2();
    GetCurrentLocation();
    signup();
    setIsDisabled(false);
    
    console.log("after signup");
  };

  {
    db.collection("Handyman").where("phone_no", "==", numberFinal)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setuserName(doc.data().username);
        })
          .catch((error) => {
            console.log("Error getting data:", error);
          });
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.userNameMob}>
        <Text style={styles.username}>{userName}</Text>
        <Text style={styles.mobno}>{mobile}</Text>
      </View>

      <FlatList
        data={[
          { key: "Edit Profile", icon: "edit", clickHandler: editProfile },
          { key: "About Us", icon: "people-alt", clickHandler: aboutUs },
          { key: "Rate Mendit App", icon: "star", clickHandler: myRatings },
          { key: "Reset Location", icon: "location-on", clickHandler: locationSetter },
          { key: "Log Out", icon: "logout", clickHandler: logOut },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={item.clickHandler}>
            <Text style={styles.icon}>
              <MaterialIcons name={item.icon} size={28} color="gray"
              />
            </Text>
            <Text style={styles.item}>{item.key}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 50,
  },

  userNameMob: {
    padding: 15,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
  },
  username: {
    fontFamily: "inter-regular",
    fontSize: 18,
  },
  mobno: {
    marginTop: 20,
    fontFamily: "inter-light",
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  icon: {
    marginLeft: 10,
  },
  item: {
    padding: 15,
    fontSize: 16,
  },
});
