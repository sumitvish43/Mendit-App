import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
// import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Profile({ navigation }) {
  const editProfile = () => {
    alert("Edit Profile", "tt");
  };
  const manageAddress = () => {
    alert("Manage", "tt");
  };
  const myRatings = () => {
    alert("Ratings", "tt");
  };
  const scheduleBookings = () => {
    alert("Book", "tt");
  };
  const aboutUs = () => {
    console.log("About");
  };
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
  return (
    <View style={styles.container}>
      <View style={styles.userNameMob}>
        <Text style={styles.username}>Aniruddha Dhawad</Text>
        <Text style={styles.mobno}>+91 8787878787</Text>
      </View>

      <FlatList
        data={[
          { key: "Edit Profile", icon: "edit", clickHandler: editProfile },
          {
            key: "Manage Addresses",
            icon: "home",
            clickHandler: manageAddress,
          },
          { key: "My Ratings", icon: "star", clickHandler: myRatings },
          {
            key: "Scheduled Bookings",
            icon: "calendar-today",
            clickHandler: scheduleBookings,
          },
          { key: "About Us", icon: "people-alt", clickHandler: aboutUs },
          { key: "Log Out", icon: "logout", clickHandler: logOut },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={item.clickHandler}>
            <Text style={styles.icon}>
              <MaterialIcons name={item.icon} size={28} color="gray" />
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
