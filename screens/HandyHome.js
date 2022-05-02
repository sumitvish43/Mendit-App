import React, { useState, useEffect } from "react";
import {FlatList, TouchableOpacity, RefreshControl,ScrollView, StyleSheet, View, Text, BackHandler, Alert } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from 'expo-location';
import { db } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Password } from "@mui/icons-material";

import { ActivityIndicator } from 'react-native';
export default function Home() {

    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
      'Wait, we are fetching you location...'
    );
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); 
    const handymanid = global.docId;

    const [refreshing, setRefreshing] = React.useState(false);
    const wait = timeout => {
      return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const reject = (docid)=>{
      db.collection("Task").doc(docid).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    }

    useEffect(()=>{
      const task = 
      db.collection('Task')
      .onSnapshot(querySnapshot=>{
        const task = [];
        querySnapshot.forEach(documentSnapshot => {
          // console.log(documentSnapshot.id);
          if(documentSnapshot.data().handymanID == handymanid){
            task.push({
              service: 'AC service',
              user: documentSnapshot.data().userId,
              key:documentSnapshot.id
            });
          }
        });
        setTasks(task);
      
        setLoading(false);
      });

      return ()=>task();
    },[]);

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
  if (loading) {
    return <ActivityIndicator/>;
  }else{
  return (
    <SafeAreaView>
    <View style={styles.container}>
      {/* <MaterialIcons name="event-note" size={58} color="gray" />
      <Text style={{ fontSize: 22 }}>Welcome, New jobs will be shown here</Text> */}
      {/* <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Text>Pull down to see RefreshControl indicator</Text> */}

        <FlatList
        data = {tasks}
        renderItem = {({item})=> (
          <View style={styles.cardContainer}>
            <View style={styles.top}>
              <Text style = {{fontFamily:'inter-regular',fontSize: 18,marginBottom: 10}}>User ID: {item.user}</Text>
              <Text style = {{fontFamily:'inter-regular',fontSize: 16}}>Service Type: {item.service}</Text>
            </View>
            <View style={styles.bottom}>
              
              <TouchableOpacity  onPress={()=>{}} >
                <Text style={styles.accept}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={()=>{}} >
                  <Text style={styles.reject} onPress={()=>{reject(item.key)}}>Reject</Text>
              </TouchableOpacity>
              </View>
          </View>
        )}
        /> 
      {/* </ScrollView> */}
    </View>
    </SafeAreaView>
  );
  }
}
const styles = StyleSheet.create({
  container:{
    marginTop: 50,
    padding: 20,
    
  },
  accept:{
    color: 'green',
    fontFamily:'inter-bold'
  },
  reject: {
    color: 'red',
    fontFamily:'inter-bold'
  },
  top:{
    marginBottom: 20,
  },  
  bottom:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },  
  cardContainer:{
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 20
  }
});
