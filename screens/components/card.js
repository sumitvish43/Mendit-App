import React from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function Card(props) {
    return (
      <View style={styles.container}>
        <SafeAreaView>      
            <View style={styles.card}>
                {props.children}   
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
    

  });
  