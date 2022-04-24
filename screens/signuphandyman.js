import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text, View, Modal,  TextInput, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { db, firebase } from '../firebase';
import MultiSelect from 'react-native-multiple-select';

export default function SignUpHandyman({navigation}){
    
    const [modalVisible, setModalVisible] = useState(true);
    const [number, onChangeNumber] = React.useState(null);
    const [text, setNewText] = React.useState(null);
    const [checked, setChecked] = React.useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const onSelectedItemsChange = (selectedItems) => {
      setSelectedItems(selectedItems);
    };
    const items = [
        {id: 1, name: 'AC service'},
        {id: 2, name: 'Electrician'},
        {id: 3, name: 'Carpenter'},
        {id: 4, name: 'Painter'},
        {id: 5, name: 'Plumber'},
        {id: 6, name: 'Cleaner'},
        {id: 7, name: 'Pest Control'},
        {id: 8, name: 'Mason'},
    ];

    const signup = () =>{
        
        if(!number || !text || !checked || !selectedItems.length){
            alert("Please fill all the details and check the checkbox")
        }
        else if (number.length != 13){
            alert("Please enter a valid phone number!")
        }
        else{
            db.collection("Handyman")
            .where("phone_no", "==", number)
            .get()
            .then(async (querySnapshot) => {
                if (querySnapshot.docs.length) {
                    alert("You are already registered!")
                }
                else{
                    db.collection("Handyman").add({
                        location: "",
                        username: text,
                        phone_no: number,
                    })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);
                        for(let i=0;i<selectedItems.length;i++){
                            db.collection("Handyman").doc(docRef.id).update({
                                services: firebase.firestore.FieldValue.arrayUnion(items[selectedItems[i]-1].name)
                            })
                        }
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
    
                            
                    navigation.navigate('Login');
                }
            })
        }

    }

    useFocusEffect(
        React.useCallback(() => {
            setModalVisible(true);
          return () => {
            setModalVisible(!modalVisible);
          };
        }, [navigation])
      );

    return (
        
        <View style={styles.container}>
            
            <LinearGradient
            colors={['#009ffd','#2a2a72']}
            style={styles.linearGradient}
            >   
                <View style={styles.logo}>
                        <Image style={{width: 90, height: 90}} source={require('../assets/images/Mendit-Logo.png')}/> 
                        <Text style={styles.logoText}> Mendit </Text>        
                </View>
                
                <Modal
                    style = {styles.modal}
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    propagateSwipe={true}
                    onRequestClose = {()=>{
                        navigation.navigate('Welcome');
                    }}
                >   
                    
                    
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <ScrollView>
                                <Text style={styles.modalText}>Sign Up As Handyman</Text>
                                
                                <Text style={{fontFamily: 'inter-regular', color: '#a6a6a6',marginTop: 50}}>Full Name</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setNewText}
                                    value = {text}
                                />
                                <Text style={{fontFamily: 'inter-regular', color: '#a6a6a6',marginTop: 40}}>Mobile Number</Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeNumber}
                                    value={number}
                                    autoCompleteType="tel"
                                    keyboardType="phone-pad"
                                    textContentType="telephoneNumber"
                                    placeholder='+917777888999'
                                    maxLength={13}
                                />

                                <View style={styles.multiselect}>
                                    <Text  style={{fontFamily: 'inter-regular', color: '#a6a6a6',marginBottom: 10}}>What services will you provide?</Text>
                                    <MultiSelect
                                        hideTags
                                        items={items}                                          
                                        uniqueKey="id"
                                        fontFamily="inter-regular"
                                        onSelectedItemsChange={onSelectedItemsChange}
                                        selectedItems={selectedItems}
                                        selectText="Pick Items"
                                        searchInputPlaceholderText="Search Items..."
                                        onChangeInput={(text) => console.log(text)}
                                        tagRemoveIconColor="#CCC"
                                        tagBorderColor="#CCC"
                                        tagTextColor="#CCC"
                                        selectedItemTextColor="#CCC"
                                        selectedItemIconColor="#00FF00"
                                        itemTextColor="#000"
                                        displayKey="name"
                                        searchInputStyle={{color: '#000',fontFamily: 'inter-regular'}}
                                        submitButtonColor="#007AFF"
                                        submitButtonText="Next"
                                    />
                                </View>
                                <View style={styles.policy}>
                                    <Checkbox
                                        status={checked ? 'checked' : 'unchecked'}
                                        color="#007AFF"
                                        onPress={() => {
                                            setChecked(!checked);
                                        }}
                                    />
                                    <Text style={{fontFamily: 'inter-regular',fontSize: 15}}>I am atleast 18 years old.</Text>
                                </View>
                                            
                                <View style={styles.buttons}>
                                    <TouchableOpacity style={styles.button1} onPress={signup}>
                                        <Text style = {styles.buttonText}>Sign Up</Text>
                                    </TouchableOpacity>
                                </View>
                                
                        
                            </ScrollView>
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
        width: '100%',
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
        right: 10,
        top: 14
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderTopColor: 'white',
        borderLeftColor:'white',
        borderRightColor: 'white',
        borderBottomColor: '#a6a6a6',
        fontFamily: 'inter-regular',
        fontSize: 23
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
    },
    policy:{
        marginTop: 40,
        flexDirection:'row',
        alignItems: 'center'
    },
    multiselect:{
        marginTop: 40
    }
});

