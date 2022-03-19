import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';


export default function Welcome({navigation}) {
    const pressHandler= () => {
        navigation.navigate('Login');
    }
    return (
      <View style={styles.container}>
        <LinearGradient
        //   colors={['#9c9c9c','#6E6E6E', '#404040' ]}
            colors={['#009ffd','#2a2a72']}
            style={styles.linearGradient}
        >
                    
            <View style={styles.content}>
                <View style={styles.logo}>
                    <Image style={{width: 75, height: 75, marginRight: 0}} source={require('../assets/images/Mendit-Logo.png')}/> 
                    <Text style={styles.logoText}> Mendit </Text>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.mainText}> All services on your fingertips. </Text>
                </View>

                <View style={styles.buttons}>
                    <TouchableOpacity style={styles.button1} onPress={pressHandler}>
                        <Text style = {styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button2} onPress={pressHandler}>
                        <Text style = {styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </View>
   
        </LinearGradient>
        <StatusBar style="auto" />

      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'inter-regular',
    },
    linearGradient: {
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        borderRadius: 5,
        height: '100%',
        width: '100%',
        padding: 20,
    },
    content:{
        marginBottom: 100,
        
    },
    logo:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 35,
        width: '100%',
        justifyContent: 'flex-start'
    },
    logoText:{
        color: 'white',
        fontSize: 37,
        fontFamily: 'inter-bold',
        margin: 0,
    },
    mainText:{
        color: 'white',
        fontSize: 19,
        fontFamily: 'inter-regular',
    },
    buttons:{
        width: '100%',
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: 100,
        height: 55,

    },
    button1: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        width: '45%',
    },
    button2: {
        backgroundColor: '#6D6D6D',
        padding: 15,
        borderRadius: 10,
        width: '45%',
    },
    buttonText:{
        color: 'white',
        textAlign: 'center',
    }

 
  });
  