import React, { useState, useEffect } from "react";
import {FlatList, TouchableOpacity, RefreshControl,ScrollView, StyleSheet, View, Text, BackHandler, Alert, Image } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Location from 'expo-location';
import { db } from "../firebase";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActivityIndicator } from 'react-native';
import Search  from "./Search";

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

    const removeRequest =(docid)=>{
      db.collection("Task").doc(docid).update({deleted: true}).then(()=>console.log("Removed the booking!!")).catch((error)=>{console.error("Error updating the document: ", error)});
    }
    const updateStatus =  (docid)=>{
      db.collection("Task").doc(docid).update({accepted: true}).then(()=>console.log("Aceepted the task!!")).catch((error)=>{console.error("Error updating the document: ", error)});
    }

    const reject = (docid)=>{
      db.collection("Task").doc(docid).update({rejected: true}).then(() => {
        console.log("Request successfully deleted!");
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
              if(documentSnapshot.data().handymanID == handymanid && !documentSnapshot.data().rejected && !documentSnapshot.data().deleted){
                task.push({
                  service: documentSnapshot.data().type,
                  user: documentSnapshot.data().customerName,
                  key: documentSnapshot.id,
                  customerNumber: documentSnapshot.data().customerNumber,
                  accepted: documentSnapshot.data().accepted,
                  timeStamp: documentSnapshot.data().date,
                  rejected: documentSnapshot.data().rejected,
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
    db.collection("Handyman").where("phone_no", "==", global.phoneNum)
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

  const updateScreen = useForceUpdate();
  function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
  }
  if (loading) {
    return <ActivityIndicator/>;
  }else{
  return (
    <View style={styles.container}>
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
    </View>
  );
  }
}
const styles = StyleSheet.create({
  container:{
    marginTop: 20,
    paddingTop: 20,
    
  },
  taskList:{
    padding: 20,
    marginBottom: 70
  },
  accept:{
    color: 'green',
    fontFamily:'inter-bold'
  },
  reject: {
    color: '#f00',
    fontFamily:'inter-bold'
  },
  top:{
    marginBottom: 20,
  },  
  bottom:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text:{
    color: '#Fff', 
    padding: 6.5, 
    backgroundColor: '#F47171',
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    fontFamily:'inter-bold',
    textAlign: "center",
    width: "100%"
},
  contact:{
    backgroundColor: "#fff",
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer:{
    borderRadius: 10,
    backgroundColor: "#e7e7e7",
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
  image:{
    height: 370,
    width: 200
  },
  nobooking:{
    justifyContent: "center",
    alignItems: "center",
    height: 600
  }
});
