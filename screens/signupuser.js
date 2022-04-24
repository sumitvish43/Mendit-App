import React, {useState} from 'react';
import {StyleSheet, Text, View, Modal,  TextInput, Image, TouchableOpacity} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {useFocusEffect } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
import { db } from '../firebase';

export default function SignUpUser({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [number, onChangeNumber] = React.useState(null);
  const [text, setNewText] = React.useState(null);
  const [checked, setChecked] = React.useState(false);

  const signup = () => {
    if (!number || !text || !checked) {
      alert("Please fill all the details and check the checkbox");
    } else {
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

      navigation.navigate("Route");
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
                placeholder="+917777888999"
                maxLength={13}
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
              <View style={styles.buttons}>
                <TouchableOpacity style={styles.button1} onPress={signup}>
                  <Text style={styles.buttonText}>Sign Up</Text>
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
});

