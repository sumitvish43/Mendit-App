import React,{useState} from 'react';
import { StyleSheet, Text, View, Modal, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

export default function SignUpAs({navigation}){
    
    const [modalVisible, setModalVisible] = useState(true);


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
                    onRequestClose = {()=>{
                        setModalVisible(!modalVisible);
                        navigation.goBack();
                    }}
                >
                    
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style = {styles.textAndIcon}>
                                <Text style={styles.modalText}>Sign Up As</Text>
                                <Image style={{width: 30, height: 30, marginTop: 42, marginLeft: 20}} source={require('../assets/images/info_icon.png')}/>
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
        justifyContent:'center',
        alignItems: 'center',
    },
    button1: {
        backgroundColor: '#007AFF',
        padding: 15,
        textAlign: 'center',
        borderRadius: 10,
        width: '100%',
        marginBottom: 40,

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