import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { modalStyles } from "../styles/modalStyles";
import { useFocusEffect } from "@react-navigation/native";

export default function SignUpAs({ navigation }) {
  const [modalVisible, setModalVisible] = useState(true);
  const showAlert = () => {
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
    <View style={modalStyles.container}>
      <LinearGradient
        // colors={['#9c9c9c','#6E6E6E', '#404040' ]}
        colors={["#009ffd", "#2a2a72"]}
        style={modalStyles.linearGradient}
      >
        <View style={modalStyles.logo}>
          <Image
            style={{ width: 90, height: 90 }}
            source={require("../assets/images/Mendit-Logo.png")}
          />
          <Text style={modalStyles.logoText}> Mendit </Text>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            navigation.navigate("Welcome");
          }}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <View style={styles.textAndIcon}>
                <Text style={modalStyles.modalText}>Sign Up As</Text>
                <TouchableOpacity onPress={showAlert}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      marginTop: 44,
                      marginLeft: 20,
                    }}
                    source={require("../assets/images/info_icon.png")}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={() => navigation.navigate("SignUpUser")}
                >
                  <Text style={modalStyles.buttonText}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button1}>
                  <Text 
                    style={modalStyles.buttonText}
                    onPress={() => navigation.navigate("SignUpHandyman")}
                  >Handyman</Text>
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
  textAndIcon: {
    flex: 1,
    flexDirection: "row",
  },

  buttons: {
    marginBottom: 250,
  },

  button1: {
    backgroundColor: "#007AFF",
    padding: 15,
    textAlign: "center",
    borderRadius: 10,
    width: "100%",
    marginTop: 20,
  },
});
