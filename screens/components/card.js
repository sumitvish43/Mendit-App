import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Card(props) {
    return (
      <View style={styles.container}>
        <SafeAreaView>
            
            <View style={styles.card}>
                <View style={styles.left}>
                    <Image
                    style={styles.image}
                    source={require("../../assets/images/placeholderPersonImage.png")}
                    />
                </View>
                <View style={styles.right}>
                    <View style={styles.one}>
                        <Text style={styles.text}>Dist</Text>            
                        <Text style={styles.text}>Rate</Text>
                    </View>
                    <View style={styles.two}><Text style={{color: 'black',fontFamily:'inter-bold', flex: 1, flexWrap: 'wrap',fontSize: 22}}>Mukesh Sharma</Text></View>
                    <View style={styles.three}>
                        <Text style={styles.text}>Chat</Text>
                        <TouchableOpacity >
                            <Text style={styles.text}>Book</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    card:{
        backgroundColor:'#C0BEBF',
        flexDirection: 'row',
        justifyContent: 'center'
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
  