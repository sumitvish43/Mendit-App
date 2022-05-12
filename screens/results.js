import React, {useState, useEffect} from "react";
import { FlatList, Text, StyleSheet, View, Image, TouchableOpacity, BackHandler, Alert } from "react-native";
//import Card from "./components/card"
import { db } from "../firebase";
import { ActivityIndicator } from 'react-native';
//import { MarkChatReadSharp } from "@mui/icons-material";

export default function Results({navigation, route}) {

  const mobile = global.phoneNum;
  const serviceType = route.params.type;
  const userid = global.docId;
  const [loading, setLoading] = useState(true); 
  const [handyman, setHandyman] = useState([]);
  const [userName, setuserName] = React.useState("");
  const [longitude, setlongitude] = useState(0);
  const [latitude, setlatitude] = useState(0);

  {
    db.collection("User").where("phone_no", "==", mobile)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setuserName(doc.data().username);
          setlongitude(doc.data().location.longitude);
          setlatitude(doc.data().location.latitude);
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
      handymanNumber: handymanNum,
      deleted: false,
      userDeleted: false
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

  function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  
  function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = degreesToRadians(lat2-lat1);
    var dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d =  Number(earthRadiusKm * c);
    return (Number((earthRadiusKm * c)/1.0));
  }

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
            key:documentSnapshot.id,
            /* {add text for distance from location here} */
            dist: distanceInKmBetweenEarthCoordinates(longitude, latitude, documentSnapshot.data().location.longitude, documentSnapshot.data().location.latitude)

          });
        }
        //console.log("distance : ", handyman[0].dist);
      });
      handyman.map((handy)=>console.log(handy.dist))

      
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
        // data = {handyman}
        data={handyman.sort((a, b) =>a.dist - b.dist)}
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
                        {/* <Text style={styles.text}>{Math.trunc(Number(item.dist))}</Text> */}
                        {/* <Text style={styles.text}>2</Text> */}

                  </TouchableOpacity>
                  <TouchableOpacity >
                      <Text style={styles.text}>{(Number(item.dist))}</Text>
                      {/* <Text style={styles.text}>2</Text> */}
                      {/* <Text style={styles.text}>{Math.trunc(Number(item.dist))}</Text> */}


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