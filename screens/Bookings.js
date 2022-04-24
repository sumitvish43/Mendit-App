import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
} from "react-native";

import Search from "./Search";
import FilterSort from "./FilterSort";
import { db } from "../firebase";

export default function Booking() {
  return (
    <View style={styles.Bookings}>
      <Search placeholderText="Search for a previous booking" />
      <FilterSort />
    </View>
  );
}

<<<<<<< HEAD
=======
//DEMO TEMPLATE TO ADD DATA INTO FIREBASE
export default class App extends Component {

    state = {  
      title: "",
      author: ""
    }
  
    
  
    render() { 
      const { title, author } = this.state
      
      const handleButtonPress = async() =>
      {
        alert("Add the book 3")
          // create new thread using firebase & firestore
          //const db = firebase.firestore();
          db.collection("books").add({
            author: "Ada3",
            title: "Lovelace3",
            
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
            
            //resolve module import
            //onClick={alert("Add the book")}
        
      }
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              value={title}
              placeholder='Title of the book'
              style={styles.textInput}
              onChangeText={value => this.setState({ title: value })}
            />
            <TextInput
              value={author}
              placeholder='Name of the Author'
              style={styles.textInput}
              onChangeText={value => this.setState({ author: value })}
            />
            <Button onPress={() => handleButtonPress()}  title='Add the book' color='#841584' />
            
             
          </View>
        </SafeAreaView>
      )
    }
  }
>>>>>>> 8a23e011e913b581e41b9c0c504e64eb9e9bd678
const styles = StyleSheet.create({
  Bookings: {
    marginTop: 50,
  },
});
