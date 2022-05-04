import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Image,
  FlatList
} from "react-native";

import { db } from "../firebase";

export default function Booking() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const yourNumber = global.phoneNum;

  useEffect(()=>{
    const task = 
    db.collection('Task')
    .onSnapshot(querySnapshot=>{
      const task = [];
      querySnapshot.forEach(documentSnapshot => {   
            if(documentSnapshot.data().customerNumber == yourNumber){
              task.push({
                service: documentSnapshot.data().type,
                user: documentSnapshot.data().customerName,
                key: documentSnapshot.id,
                customerNumber: documentSnapshot.data().customerNumber,
                accepted: documentSnapshot.data().accepted,
                timeStamp: documentSnapshot.data().date,
                handyNumber: documentSnapshot.data().handymanNumber,
                handyName: documentSnapshot.data().handymanName,
                rejected: documentSnapshot.data().rejected
              }); 
        }
      });
      setTasks(task);        
      setLoading(false);
    });

    return ()=>task();
  },[]);

  return (
    <View style={styles.Bookings}>
      <View style={styles.header}><Text style={{fontFamily:"inter-bold", fontSize:18, padding: 10}}>YOUR BOOKINGS</Text></View>
      {tasks.length?
      <FlatList
        style={styles.taskList}
        data = {tasks}
        renderItem = {({item})=> (
          <View style={styles.cardContainer}>
            <View style={styles.top}>
              <Text style = {{fontFamily:'inter-regular',fontSize: 18,marginBottom: 10}}>Handyman: {item.handyName}</Text>
              <Text style = {{fontFamily:'inter-regular',fontSize: 16}}>Service Type: {item.service}</Text>
              <Text style = {{fontFamily:'inter-regular',fontSize: 16}}>Requested on: {item.timeStamp}</Text>
            </View>

            {item.accepted ? <View style={styles.contact}><Text style={{fontFamily:'inter-bold', color:"green"}}>Accepted</Text><Text style = {{fontFamily:'inter-bold', color: "blue", fontSize: 15, marginVertical: 10}}>Handyman's number: {item.handyNumber}</Text></View>: item.rejected ? <View style={styles.bottom}>
              <Text style={{color: "#f00", fontFamily:"inter-bold"}}>Rejected</Text>
            </View>:<View style={styles.bottom}>
              <Text style={{color: "#e1ad01", fontFamily:"inter-bold"}}>Request Pending...</Text>
            </View>}
            
          </View>
        )}
        /> :<View style={styles.nobooking}><Image style={styles.image}
        source={require("../assets/images/no_bookings.png")}/><Text style={{fontFamily: "inter-bold", fontSize: 20}}>No bookings yet!</Text></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  Bookings: {
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#aaa",
  },
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
  contact:{
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer:{
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
  image:{
    height: 200,
    width: 200
  },
  nobooking:{
    justifyContent: "center",
    alignItems: "center",
    height: 600
  }
});
