import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  BackHandler,
  Alert
} from "react-native";
import {db} from "../firebase";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function HandyProfile({navigation}) {
  const [userName, setuserName] = React.useState("Anonymous");

  const editProfile = () => {
    alert("Edit Profile", "tt");
  };
  const myRatings = () => {
    Alert.alert("Rate 5 star","You can rate our App on Play Store!");
  };
  const aboutUs = () => {
    Alert.alert("About", "Mendit helps people finding good handymen and workers around them. One can request a handyman and get his/her contact number.");
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

  {
    db.collection("Handyman").where("phone_no", "==", global.phoneNum)
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
        <Text style={styles.mobno}>{global.phoneNum}</Text>
      </View>

      <FlatList
        data={[
          { key: "Edit Profile", icon: "edit", clickHandler: editProfile },
          { key: "Rate Mendit App", icon: "star", clickHandler: myRatings },
          { key: "About Us", icon: "people-alt", clickHandler: aboutUs },
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
