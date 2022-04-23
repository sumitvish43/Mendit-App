import React,{useState} from 'react';
import { Text, View, Modal,  TextInput, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect } from '@react-navigation/native';
import {modalStyles} from '../styles/modalStyles';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import { db, app } from '../firebase';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';



const auth = getAuth();

export default function Login({navigation}){
        
    const [modalVisible, setModalVisible] = useState(true);
    const recaptchaVerifier = React.useRef(null);
    const [number, onChangeNumber] = React.useState(null);
    const [verificationId, setVerificationId] = useState(null);
    const firebaseConfig = app ? app.options : undefined;
    const [current, setCurrent] = useState("");


    const pressHandler = () =>{
        setModalVisible(true);
        navigation.navigate('SignUpAs');
    }

    const gotoVerify =      
    async () => {
        if(current){
            if(number){
                if(current == "user")
                {
                    db.collection("User").where("phone_no","==",number )
                    .get()
                    .then(async (querySnapshot) => {
                        if (querySnapshot.docs.length){
                            console.log(querySnapshot.docs.length);
                            try {
                                const phoneProvider = new PhoneAuthProvider(auth);
                                const verificationId = await phoneProvider.verifyPhoneNumber(
                                number,
                                recaptchaVerifier.current
                                );
                                setVerificationId(verificationId);
                                console.log('Verification code has been sent to your phone.');
                                navigation.navigate('Verify',{verifyId: verificationId});
                            
                            } catch (err) {
                                showMessage({ text: `Error: ${err.message}`, color: 'red' });
                                console.log(`Error: ${err.message}`);
                            }
                        }
                        else{
                            alert("You need to Register first!");
                        }
                        
                    });
                }
                else if(current == "handyman"){
                    db.collection("Handyman").where("phone_no","==",number )
                    .get()
                    .then(async (querySnapshot) => {
                        if (querySnapshot.docs.length){
                            console.log(querySnapshot.docs.length);
                            try {
                                const phoneProvider = new PhoneAuthProvider(auth);
                                const verificationId = await phoneProvider.verifyPhoneNumber(
                                number,
                                recaptchaVerifier.current
                                );
                                setVerificationId(verificationId);
                                console.log('Verification code has been sent to your phone.');
                                navigation.navigate('Verify',{verifyId: verificationId});
                            
                            } catch (err) {
                                showMessage({ text: `Error: ${err.message}`, color: 'red' });
                                console.log(`Error: ${err.message}`);
                            }
                        }
                        else{
                            alert("You need to Register first!");
                        }
                        
                    });
                }
                
                
            
            }
            else{
                alert("Enter your phone number!");
            }
        }else{
            alert("Select if you are a user or handyman.")
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
        <View style={modalStyles.container}>
            <LinearGradient
            colors={['#009ffd','#2a2a72']}
            style={modalStyles.linearGradient}
            >
                <View style={modalStyles.logo}>
                        <Image style={{width: 90, height: 90}} source={require('../assets/images/Mendit-Logo.png')}/> 
                        <Text style={modalStyles.logoText}> Mendit </Text>         
                </View>
                
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose = {()=>{
                        navigation.navigate('Welcome');
                    }}
                >
                    
                    <View style={modalStyles.centeredView}>
                        <View style={modalStyles.modalView}>
                            <Text style={modalStyles.modalText}>Log In As</Text>
                            <FirebaseRecaptchaVerifierModal
                              ref={recaptchaVerifier}
                              firebaseConfig={app.options}
                            />
                            <RadioButtonGroup
                                containerStyle={{marginTop:30 }}
                                selected={current}
                                onSelected={(value) => setCurrent(value)}
                                radioBackground="#007AFF"
                            >
                                <RadioButtonItem 
                                    value="user" 
                                    label={
                                        <Text style={{fontFamily: 'inter-regular', fontSize: 18,color: '#3d3d3d',margin:5}}>User</Text>
                                    }/>
                                <RadioButtonItem
                                    value="handyman"
                                    label={
                                        <Text style={{fontFamily: 'inter-regular', fontSize: 18,color: '#3d3d3d',margin:5}}>Handyman</Text>
                                      }
                                />
                            </RadioButtonGroup>
                            <Text style={{fontFamily: 'inter-regular', color: '#a6a6a6',marginTop: 40}}>Mobile Number</Text>
                            <TextInput
                                style={modalStyles.input}
                                onChangeText={onChangeNumber}
                                autoFocus
                                autoCompleteType="tel"
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                placeholder='+917777888999'
                                maxLength={13}
                            />
                            <View style={modalStyles.buttons}>
                                <TouchableOpacity style={modalStyles.button1} >
                                    <Text style = {modalStyles.buttonText} onPress={gotoVerify}
                                  >Send OTP
                                    </Text>
                                </TouchableOpacity>
                               
                                <TouchableOpacity style={modalStyles.button2} onPress={pressHandler}>
                                    <Text style = {modalStyles.button2Text}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>   
            </LinearGradient>
        </View>
    );
}




