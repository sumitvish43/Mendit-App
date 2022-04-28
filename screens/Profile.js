import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { useNavigation } from '@react-navigation/native';

export default function Profile({navigation}) {
  // const navigation = useNavigation(); 

  const pressHandler = () =>{
    // if(item == "logout"){
      navigation.navigate("Welcome");
    // }
  }
  return (
    <View style={styles.container}>
      <View style={styles.userNameMob}>
        <Text style={styles.username}>Aniruddha Dhawad</Text>
        <Text style={styles.mobno}>+91 8787878787</Text>
      </View>

      <FlatList
        data={[
          { key: "Edit Profile", icon: "edit" },
          { key: "Manage Addresses", icon: "home" },
          { key: "My Ratings", icon: "star" },
          { key: "Scheduled Bookings", icon: "calendar-today" },
          { key: "About Us", icon: "people-alt" },
          { key: "Log Out", icon: "logout" },
        ]}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.listItem} onPress={pressHandler}>
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
