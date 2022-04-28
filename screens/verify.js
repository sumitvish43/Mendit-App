import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { modalStyles } from "../styles/modalStyles";

import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
const auth = getAuth();
export default function Verify({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(true);
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;
  const verificationId = route.params.verifyId;
  const type = route.params.type;
  const [verificationCode, setVerificationCode] = React.useState();
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
              <Text style={modalStyles.modalText}>OTP</Text>
              <Text
                style={{
                  fontFamily: "inter-regular",
                  color: "#a6a6a6",
                  marginTop: 50,
                }}
              >
                Enter the OTP received on your registered mobile number
              </Text>
              <TextInput
                style={modalStyles.input}
                onChangeText={setVerificationCode}
                keyboardType="numeric"
                maxLength={6}
                placeholder="123456"
              />
              <View style={modalStyles.buttons}>
                <TouchableOpacity
                  style={modalStyles.button1}
                  onPress={async () => {
                    try {
                      const credential = PhoneAuthProvider.credential(
                        verificationId,
                        verificationCode
                      );
                      await signInWithCredential(auth, credential);
                      if (type == "user") {
                        navigation.navigate("UserRoute");
                      } else {
                        navigation.navigate("HandyRoute");
                      }
                    } catch (err) {
                      showMessage({ text: `Enter correct OTP`, color: "red" });
                    }
                  }}
                >
                  <Text style={modalStyles.buttonText}>Submit</Text>
                </TouchableOpacity>
                {message ? (
                  <TouchableOpacity
                    style={[
                      StyleSheet.absoluteFill,
                      { backgroundColor: 0xffffffee, justifyContent: "center" },
                    ]}
                    onPress={() => showMessage(undefined)}
                  >
                    <Text
                      style={{
                        color: message.color || "blue",
                        fontSize: 17,
                        textAlign: "center",
                        margin: 20,
                      }}
                    >
                      {message.text}
                    </Text>
                  </TouchableOpacity>
                ) : undefined}
                {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
              </View>
            </View>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
}
