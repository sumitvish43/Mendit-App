<<<<<<< Updated upstream
import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal,  TextInput, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { db } from '../firebase';
=======
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, TextInput, Image, TouchableOpacity, ToastAndroid, Platform, AlertIOS, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { db, firebaseSvc } from '../firebase';
import * as Location from 'expo-location';
//import { Constants, ImagePicker, Permissions } from 'expo';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as ImageEditor from 'expo-image-manipulator';
>>>>>>> Stashed changes

export default function SignUpUser({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [number, onChangeNumber] = React.useState(null);
  const [text, setNewText] = React.useState(null);
  const [checked, setChecked] = React.useState(false);
<<<<<<< Updated upstream

  const signup = () => {
    if (!number || !text || !checked) {
      alert("Please fill all the details and check the checkbox!");
    } 
    else if (number.length != 13){
      alert("Please enter a valid phone number!")
    }
    else {
=======
  const [checked2, setChecked2] = React.useState(false);
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)

  const locn = constructor({ latitude: 0, longitude: 0 })
  const [currCoords, setCurrCoords] = useState(locn)

  const signup = () => {
    if (isDisabled) { alert("Please Select Location First !!") } else {
      if (!number || !text || !checked) {
        alert("Please fill all the details and check the checkbox!");
      }
      else if (number.length != 10) {
        alert("Please enter a valid phone number!")
      }
      else {
        //number = "+91"+number;
        const numberFinal = "+91" + number;
        db.collection("User")
          .where("phone_no", "==", numberFinal)
          .get()
          .then(async (querySnapshot) => {
            if (querySnapshot.docs.length) {
              alert("You are already registered!")
            }
            else {
              db.collection("User")
                .add({
                  location: currCoords,
                  username: text,
                  phone_no: numberFinal,
                })
                .then((docRef) => {
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                });
              //onImageUpload(); //for now, leave it
              //navigation.navigate("Login");
            }
          })
>>>>>>> Stashed changes

      db.collection("User")
      .where("phone_no", "==", number)
      .get()
      .then(async (querySnapshot) => {
        if (querySnapshot.docs.length) {
          alert("You are already registered!")
        }
        else{
          db.collection("User")
          .add({
            location: "",
            username: text,
            phone_no: number,
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });

          navigation.navigate("Login");
        }
      })


<<<<<<< Updated upstream
      
=======
      }
>>>>>>> Stashed changes
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setModalVisible(true);
      return () => {
        setModalVisible(!modalVisible);
      };
    }, [navigation])
  );

<<<<<<< Updated upstream
=======
  const onImageUpload = async () => {
    console.log("camera button pressed")
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    try {
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        console.log('choosing image granted...');
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        console.log(
          'ready to upload... pickerResult json:' + JSON.stringify(pickerResult)
        );

        var wantedMaxSize = 150;
        var rawheight = pickerResult.height;
        var rawwidth = pickerResult.width;

        var ratio = rawwidth / rawheight;
        var wantedwidth = wantedMaxSize;
        var wantedheight = wantedMaxSize / ratio;
        // check vertical or horizontal
        if (rawheight > rawwidth) {
          wantedwidth = wantedMaxSize * ratio;
          wantedheight = wantedMaxSize;
        }
        console.log("scale image to x:" + wantedwidth + " y:" + wantedheight);
        let resizedUri = await new Promise((resolve, reject) => {
          ImageEditor.manipulateAsync(pickerResult.uri,
            {
              height: pickerResult.height,
              width: pickerResult.width,
              originX: 0,
              originY: 0,              
            },
            (uri) => resolve(uri),
            () => reject(),
          );
        });
        let uploadUrl = await firebaseSvc.uploadImage(resizedUri);
        //let uploadUrl = await firebaseSvc.uploadImageAsync(resizedUri);
        await this.setState({ avatar: uploadUrl });
        console.log(" - await upload successful url:" + uploadUrl);
        console.log(" - await upload successful avatar state:" + this.state.avatar);
        await firebaseSvc.updateAvatar(uploadUrl); //might failed
      }
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  };

  const locationSetter = () => {


    const GetCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Permission not granted',
          'Allow the app to use location service.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }

      let { coords } = await Location.getCurrentPositionAsync();
      const temp = constructor({ latitude: coords.latitude, longitude: coords.longitude })
      //  const temp = constructor({coords.latitude, coords.longitude})

      // coordinates: new db.GeoPoint(Number(coords.latitude), Number(coords.longitude))
      console.log("co", temp)
      if (coords) {
        //const { latitude, longitude } = coords;
        const msg = "Saving Location"
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
          AlertIOS.alert(msg);
        }
        setCurrCoords(temp)

      }
    };

    const CheckIfLocationEnabled2 = async () => {
      let enabled = await Location.hasServicesEnabledAsync();

      if (!enabled) {
        Alert.alert(
          'Location Service not enabled',
          'Please enable your location services to continue',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      } else {
        setLocationServiceEnabled(enabled);
      }
    };

    CheckIfLocationEnabled2();
    GetCurrentLocation();
    setIsDisabled(false)
  }

>>>>>>> Stashed changes
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#009ffd", "#2a2a72"]}
        style={styles.linearGradient}
      >
        <View style={styles.logo}>
          <Image
            style={{ width: 90, height: 90 }}
            source={require("../assets/images/Mendit-Logo.png")}
          />
          <Text style={styles.logoText}> Mendit </Text>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            navigation.navigate("Welcome");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Sign Up As User</Text>
              <Text
                style={{
                  fontFamily: "inter-regular",
                  color: "#a6a6a6",
                  marginTop: 50,
                }}
              >
                Full Name
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={setNewText}
                value={text}
              />
              <Text
                style={{
                  fontFamily: "inter-regular",
                  color: "#a6a6a6",
                  marginTop: 50,
                }}
              >
                Mobile Number
              </Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
<<<<<<< Updated upstream
                placeholder="+917777888999"
                maxLength={13}
=======
                placeholder="7777888999"
                maxLength={10}
                className='input'
>>>>>>> Stashed changes
              />
              <View style={styles.policy}>
                <Checkbox
                  status={checked ? "checked" : "unchecked"}
                  color="#007AFF"
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Text>I am atleast 18 years old.</Text>
              </View>
<<<<<<< Updated upstream
=======
              {/* <View style={styles.buttons}>
                <TouchableOpacity style={styles.button1} onPress={()=>locationSetter()}>
                  <Text style={styles.buttonText}>Location</Text>
                </TouchableOpacity>
              </View> */}
              <View style={styles.policy}>
                <Checkbox
                  status={checked2 ? "checked" : "unchecked"}
                  color="#007AFF"
                  onPress={() => {
                    setChecked2(!checked2);
                    locationSetter();
                  }}
                />
                <Text>I Consent to Provide Location</Text>
              </View>
              <Button
                title="Upload Avatar Image"
                style={styles.button1}
                onPress={onImageUpload}
              />
>>>>>>> Stashed changes
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button1} onPress={signup}>
                  <Text style={styles.buttonText}>Sign Up</Text>
<<<<<<< Updated upstream
                </TouchableOpacity>
=======
                </TouchableOpacity>}
                {!isDisabled && <TouchableOpacity style={styles.button1} onPress={signup}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                }
>>>>>>> Stashed changes
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({

<<<<<<< Updated upstream
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
    }
=======
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
  centeredView: {
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
  modalText: {
    marginTop: 40,
    fontFamily: 'inter-bold',
    fontSize: 23,
  },
  logo: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 35,
    justifyContent: 'flex-start'
  },
  logoText: {
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
    borderLeftColor: 'white',
    borderRightColor: 'white',
    borderBottomColor: '#a6a6a6',
    fontFamily: 'inter-regular',
    fontSize: 23
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#007AFF',
    padding: 15,
    textAlign: 'center',
    borderRadius: 10,
    width: '100%',

  },
  button3: {
    backgroundColor: '#777777',
    padding: 15,
    textAlign: 'center',
    borderRadius: 10,
    width: '100%',

  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },

  button2: {
    backgroundColor: 'white',
  },
  button2Text: {
    color: '#007AFF',
  },
  policy: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center'
  }
>>>>>>> Stashed changes
});

