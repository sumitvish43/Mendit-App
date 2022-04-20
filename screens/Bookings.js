import React, {Component} from "react";
import { StyleSheet, SafeAreaView, Text, View, TextInput, Button  } from "react-native";
//import { db } from "../firebase"

import Search from "./Search";
import FilterSort from "./FilterSort";
import { db } from "../firebase"

export  function Booking() {

  return (
    <View style={styles.Bookings}>
      <Search placeholderText="Search for a previous booking" />
      <FilterSort />
    </View>
  );
  
}

//DEMO TEMPLATE TO ADD DATA INTO FIREBASE
export default class App extends Component {

    state = {
      
      title: "",
      author: ""
    }
  
    
  
    render() {
      const { title, author } = this.state
      //const { title, author } = this.state
      
      const handleButtonPress = async() =>
      {
        alert("Add the book 2")
          // create new thread using firebase & firestore
          //const db = firebase.firestore();
          db.collection("books").add({
            author: "Ada2",
            title: "Lovelace2",
            
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
const styles = StyleSheet.create({
  Bookings: {
    marginTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  inputContainer: {
    margin: 30
  },
  textInput: {
    height: 30,
    textAlign: "center",
    color: "#333333",
    marginBottom: 10,
    fontSize: 24,
    borderWidth: 1,
    borderBottomColor: "#111111"
  }
  
});