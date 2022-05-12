import React, { useEffect } from "react";
import { StyleSheet, View, Text, BackHandler, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Home() {
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

  return (
    <View style={styles.container}>
<<<<<<< Updated upstream
      <MaterialIcons name="event-note" size={58} color="gray" />
      <Text style={{ fontSize: 22 }}>Welcome, New jobs will be shown here</Text>
=======
      <Search placeholderText={displayCurrentAddress}/>
      {tasks.length?
        <FlatList
        style={styles.taskList}
        data = {tasks}
        renderItem = {({item})=> (
          <View style={styles.cardContainer}>
            <View style={styles.top}>
              <Text style = {{fontFamily:'inter-regular',fontSize: 17,marginBottom: 10, color: "black",}}>Customer: {item.user}</Text>
              <Text style = {{fontFamily:'inter-regular',fontSize: 14, color: "black",}}>Service Type: {item.service}</Text>
              <Text style = {{fontFamily:'inter-regular',fontSize: 14, color: "black",}}>Requested on: {item.timeStamp.slice(0, -12)}</Text>
            </View>

            {item.rejected || item.accepted ?<View style={styles.contact}><Text style = {{fontFamily:'inter-regular',fontSize: 14, marginVertical: 10}}>Customer's number: {item.customerNumber}</Text><Text style={styles.text} onPress={()=>{removeRequest(item.key);}}>Remove</Text></View>:
            <View style={styles.bottom}>
              
              <TouchableOpacity>
                <Text style={styles.accept} onPress={()=>{ updateScreen(); updateStatus(item.key);}}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                  <Text style={styles.reject} onPress={()=>{ reject(item.key)}}>Reject</Text>
              </TouchableOpacity>
            </View>}
          </View>
        )}
        /> : <View style={styles.nobooking}><Image style={styles.image}
        source={require("../assets/images/no_requests.png")}/><Text style={{fontFamily: "inter-bold", fontSize: 20}}>No work requests!</Text></View>}
>>>>>>> Stashed changes
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
