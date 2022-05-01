import React, {useState, useEffect} from "react";
import { FlatList, Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Card from "./components/card"
import { db } from "../firebase";
import { ActivityIndicator } from 'react-native';

export default function Results() {
  const userid = global.docId;
  const [loading, setLoading] = useState(true); 
  const [handyman, setHandyman] = useState([]);
 
  const createTask = (handymanDocId,service) =>{
    db.collection('Task')
    .add({
      handymanID: handymanDocId,
      type: service,
      userId: userid,
      date: new Date().toUTCString(),

    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }
  useEffect(()=>{
    const handyman = 
    db.collection('Handyman')
    .onSnapshot(querySnapshot=>{
      const handyman = [];
      querySnapshot.forEach(documentSnapshot => {
        if(documentSnapshot.data().services[0] == "AC service"){
          handyman.push({
            service: 'AC service',
            name: documentSnapshot.data().username,
            key:documentSnapshot.id
          });
        }
      });
      setHandyman(handyman);
      setLoading(false);
    });
    return ()=>handyman();
  },[]);

    if (loading) {
      return <ActivityIndicator />;
    }
    else{
      return (
      <View style={styles.container}>
        <FlatList
        data = {handyman}
        renderItem = {({item})=> (
        <View>

        <Card>
          <View style={styles.left}>
            <Image
            style={styles.image}
            source={require("../assets/images/placeholderPersonImage.png")}
            />
          </View>
          <View style={styles.right}>
              <View style={styles.one}>
                  <Text style={styles.text}>Dist</Text>            
                  <Text style={styles.text}>Rate</Text>
              </View>
              <View style={styles.two}><Text style={{color: 'black',fontFamily:'inter-bold', flex: 1, flexWrap: 'wrap',fontSize: 22}}>{item.name}</Text></View>
              <View style={styles.three}>
                  <Text style={styles.text}>Chat</Text>
                  <TouchableOpacity  onPress={()=>{createTask(item.key,item.service)}} >
                      <Text style={styles.text}>Book</Text>
                  </TouchableOpacity>
              </View>
          </View>
        </Card>
        </View>
        )}
        /> 
      </View>
    );
  }

  }
  
const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  right:{
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    
  },
  one:{
      color: 'white',
      flexDirection: 'row',
      marginTop: 10,
      marginLeft: -5,
  },
  two:{
      marginTop: 10,
      flexDirection: 'row',
  },
  three:{
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end'
  },
  text:{
      color: '#F47171', 
      padding: 5, 
      backgroundColor: 'white',
      margin: 5,
      borderRadius:8,
      fontFamily:'inter-bold'
  },
});
  