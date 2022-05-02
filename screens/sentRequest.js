
import React, {useState, useEffect} from "react";
import { FlatList, Text, StyleSheet, View, Image, TouchableOpacity, BackHandler, Alert } from "react-native";
import { Button } from "react-native-paper";

export default function Sentrequest({navigation}){
    const userNumber = global.phoneNum;
    console.log(userNumber);
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

return(
    <View style={styles.container}>
    <Image style={styles.image} source={require("../assets/images/request1.png")}/>
    <Text style={styles.headText}>REQUEST SENT</Text>
    <Text style={styles.text}>You can check the request status in {'\n'}<Text style={{fontWeight: "bolder", fontSize: 22}}>MY BOOKINGS</Text></Text>
    <Button onPress={()=>navigation.navigate("UserRoute", {number: userNumber})} style={styles.homebutton}><Text style={{color: "white"}}>GO TO HOME</Text></Button>
    </View>
)
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    headText:{
        marginBottom: 15,
        fontSize: 24
    },
    text:{
        justifyContent: "center",
        textAlign: "center",
        fontSize: 20
    },
    image:{
        height: 200,
        width: 200
    },
    homebutton:{
        marginTop: 40,
        paddingHorizontal:23,
        color: "white",
        backgroundColor: "#000"
    }
  });