import React, {useState, useEffect} from "react";
import { FlatList, Text, StyleSheet, View, Image, TouchableOpacity, BackHandler, Alert } from "react-native";
import Card from "./components/card"
import { db } from "../firebase";
import { ActivityIndicator } from 'react-native';

export default function Results({navigation, route}) {

  const mobile = global.phoneNum;
  const serviceType = route.params.type;
  const userid = global.docId;
  const [loading, setLoading] = useState(true); 
  const [handyman, setHandyman] = useState([]);
  const [userName, setuserName] = React.useState("");

  {
    db.collection("User").where("phone_no", "==", mobile)
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

  const createTask = (handyName, handymanNum, handymanDocId,service) =>{
    db.collection('Task')
    .add({
      handymanID: handymanDocId,
      type: service,
      userId: userid,
      date: new Date().toUTCString(),
      accepted: false,
      customerName: userName,
      customerNumber: mobile,
      rejected: false,
      handymanName: handyName,
      handymanNumber: handymanNum
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  };
  useEffect(() => {
    const backButtonPress = () => {
      navigation.navigate('UserRoute');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backButtonPress
    );

    return () => backHandler.remove();
  }, []);

  useEffect(()=>{
    const handyman = 
    db.collection('Handyman')
    .onSnapshot(querySnapshot=>{
      const handyman = [];
      querySnapshot.forEach(documentSnapshot => {
        if(documentSnapshot.data().services.includes(serviceType)){
          handyman.push({
            service: serviceType,
            name: documentSnapshot.data().username,
            handyNumber: documentSnapshot.data().phone_no,
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
        <View style={styles.header}><Text style={{fontFamily:"inter-bold", fontSize:18, padding: 10}}>SEARCH RESULTS</Text></View>
        <FlatList
        data = {handyman}
        renderItem = {({item})=> (

        <View style={styles.card}>
          <View style={styles.left}>
            <Image
            style={styles.image}
            source={require("../assets/images/placeholderPersonImage.png")}
            />
          </View>
          <View style={styles.right}>
              <View style={styles.two}><Text style={{color: 'black',fontFamily:'inter-bold', flex: 1, flexWrap: 'wrap',fontSize: 22}}>{item.name}</Text>
              </View><Text style={{fontFamily:'inter-bold'}}>{serviceType}</Text>
              <View style={styles.three}>
                  <TouchableOpacity >
                      <Text style={styles.text} onPress={()=>{createTask(item.name, item.handyNumber, item.key,item.service); navigation.navigate("SentRequest",{navigation: navigation})}}>Book</Text>
                  </TouchableOpacity>
              </View>
          </View>
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
    padding: 20,
    marginTop: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  left:{
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: "#99e5ff"
  },
  right:{
    padding: 20,
    width: "100%",
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
      color: '#Fff', 
      padding: 6.5, 
      backgroundColor: '#F47171',
      // margin: 5,
      right: 4,
      borderRadius:7,
      fontFamily:'inter-bold'
  },
  card:{
    flexDirection: "row",
      height: 150,
      width: "100%",
      backgroundColor: "white",
      marginBottom: 20,
      borderRadius: 12,
  },

});