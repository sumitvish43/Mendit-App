import React,{useState} from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export default function Login(){
    const [modalVisible, setModalVisible] = useState(true);
    const [number, onChangeNumber] = React.useState(null);
    const pressHandler= () => {
        
    }
    return (
        <View style={styles.container}>
            <LinearGradient
            // colors={['#9c9c9c','#6E6E6E', '#404040' ]}
            colors={['#009ffd','#2a2a72']}
            style={styles.linearGradient}
            >
                <View style={styles.logo}>
                        <Image style={{width: 75, height: 75}} source={require('../assets/images/Mendit-Logo.png')}/> 
                        <Text style={styles.logoText}> Mendit </Text>
                        
                </View>
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Log In</Text>
                            <Text style={{fontFamily: 'inter-regular', color: '#a6a6a6',marginTop: 50}}>Mobile Number</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeNumber}
                                value={number}
                                keyboardType="numeric"
                            />
                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.button1} onPress={pressHandler}>
                                    <Text style = {styles.buttonText}>Send OTP</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button2} onPress={pressHandler}>
                                    <Text style = {styles.button2Text}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>   
            </LinearGradient>
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
        borderRadius: 5,
        height: '100%',
        width: '100%',
        padding: 20,
    },
    centeredView:{
        flex: 1,
        justifyContent: 'flex-end',
        width: '100%',
    },
    modalView: {
        backgroundColor: 'white',
        height: '80%',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        padding: 20,
        
    },
    modalText:{
        marginTop: 40,
        fontFamily: 'inter-bold',
        fontSize: 23,
    },
    logo:{
        flex: 1,
        flexDirection: 'row',
        marginTop: 35,
        justifyContent: 'flex-start'
    },
    logoText:{
        color: 'white',
        fontSize: 37,
        fontFamily: 'inter-bold',
        margin: 0,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderTopColor: 'white',
        borderLeftColor:'white',
        borderRightColor: 'white',
        borderBottomColor: '#a6a6a6',
        padding: 10,
    },
    buttons:{
        flex: 1,
        justifyContent:'space-around',
        alignItems: 'center',
    },
    button1: {
        backgroundColor: '#007AFF',
        padding: 15,
        textAlign: 'center',
        borderRadius: 10,
        width: '100%',

    },
    buttonText:{
        color: 'white',
        textAlign: 'center',
    },
    button2: {
        backgroundColor: 'white',
    },
    button2Text: {
        color: '#007AFF',           
    }
});