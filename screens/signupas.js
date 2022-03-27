import React,{useState} from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';


export default function SignUpAs({navigation}){
    
    const [modalVisible, setModalVisible] = useState(true);
    const showAlert = () =>{
        Alert.alert(
            "",
            'Tap on "User" to avail services.\n\nTap on "Handyman" to provide services.',
            [
              {
                text: "Ok",
                style: "cancel",
              },
            ],
            {
              cancelable: true,
              
            
            }
          );
          
    }
    // useEffect({
    //     return(){
    //         setModalVisible(!modalVisible);
    //     }
    // })
    

    return (
        <View style={styles.container}>
            <LinearGradient
            // colors={['#9c9c9c','#6E6E6E', '#404040' ]}
            colors={['#009ffd','#2a2a72']}
            style={styles.linearGradient}
            >
                <View style={styles.logo}>
                        <Image style={{width: 90, height: 90}} source={require('../assets/images/Mendit-Logo.png')}/> 
                        <Text style={styles.logoText}> Mendit </Text>
                        
                </View>
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose = {()=>{
                        navigation.navigate("Login");
                    }}
                >
                    
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style = {styles.textAndIcon}>
                                <Text style={styles.modalText}>Sign Up As</Text>
                                <TouchableOpacity onPress={showAlert}>
                                    <Image style={{width: 30, height: 30, marginTop: 44, marginLeft: 20}} source={require('../assets/images/info_icon.png')}/>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.buttons}>
                                <TouchableOpacity style={styles.button1} >
                                    <Text style = {styles.buttonText}>User</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button1}>
                                    <Text style = {styles.buttonText}>Handyman</Text>
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
    textAndIcon:{
        flex: 1,
        flexDirection:'row',
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
        flexDirection: 'column',
        // alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    modalText:{
        marginTop: 40,
        fontFamily: 'inter-bold',
        fontSize: 23,
        marginBottom: 0,
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
        right: 10,
        top: 14
    },

    buttons:{
        marginBottom:250,    
        // height: '100%',

    },
    button1: {
        backgroundColor: '#007AFF',
        padding: 15,
        textAlign: 'center',
        borderRadius: 10,
        width: '100%',
        marginTop: 20,
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