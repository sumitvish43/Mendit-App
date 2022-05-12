//import { ControlPointSharp } from "@mui/icons-material";
//import { addDoc, collection, doc } from "firebase/firestore";
import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Image,
  FlatList
} from "react-native";

import { db } from "../firebase";

export default function Booking() {
  const [tasks, setTasks] = useState([]);
  //const [loading, setLoading] = useState(true); 
  const [docid, setDocid] = useState("temp")
  const [openchats, setopenchats] = useState([]);
  const [loading, setLoading] = useState(true);
  const yourNumber = global.phoneNum;

  useEffect(() => {
    const task =
      db.collection('Task')
        .onSnapshot(querySnapshot => {
          const task = [];
          querySnapshot.forEach(documentSnapshot => {
            if (documentSnapshot.data().customerNumber == yourNumber) {
              task.push({
                service: documentSnapshot.data().type,
                user: documentSnapshot.data().customerName,
                key: documentSnapshot.id,
                customerNumber: documentSnapshot.data().customerNumber,
                accepted: documentSnapshot.data().accepted,
                timeStamp: documentSnapshot.data().date,
                handyNumber: documentSnapshot.data().handymanNumber,
                handyName: documentSnapshot.data().handymanName,
                rejected: documentSnapshot.data().rejected
              });
            }
          });
          setTasks(task);
          setLoading(false);
        });

    return () => task();
  }, []);

  const redirectChat = (hname, hno, uname2) => {
    //const redirectChat = () => {

    //alert("chat" + hname + hno + uname2);
    alert("chat", hno, hname, yourNumber, uname2);
    console.log(hno, hname, uname2);
    //hname, hno, yourNumber
    /**
     go to chat
     search for doc where hname AND uname are present
      if found, redirect to that one
    else create doc, add fields of hid, uid, uname, hname
      create collection inside it
     */
    // db.collection('chats')
    //   .where("uID", "==", yourNumber)
    //   //.where("hID","==",hno)
    //   .get()
    //   .then((querySnapshot) => {
    //     console.log("querysnapshots2");
    //     querySnapshot.forEach((doc) => {
    //       console.log("forEach", yourNumber);
    //       if (querySnapshot.docs.length) { //uID stores id of user in convo, similarly for hID
    //         // openchats.push({
    //         //   handyID: documentSnapshot.data().hID,
    //         //   handyName: documentSnapshot.data().hname,
    //         //   userID: documentSnapshot.data().uID,
    //         //   uName: documentSnapshot.data().uname,
    //         //   key: documentSnapshot.id,
    //         // });
    //         console.log("if")
    //         var handys = doc.where("hID", "==", hno)
    //         //console.log(handys)
    //         if (handys.length) {
    //           navigation.navigate('NestedChat', { docId: doc.id, userID: doc.data().uID, handyID: doc.data().hID })
    //         }
    //         else {
    //           //create document in chats, add info, create chats2, redirect
    //           // addDoc(collection(db,'chats'),{
    //           //   hID: hno,
    //           //   uID: yourNumber,
    //           //   hname: hname,
    //           //   uname: uname2,

    //           // })
    //           console.log("else");
    //           db.collection('chats').add({
    //             hID: hno,
    //             uID: yourNumber,
    //             hname: hname,
    //             uname: uname2
    //           }).then((docRef) => {
    //             console.log("document written with ID: ", docRef.id);
    //             db.collection('chats/' + docRef.id + '/chats2');
    //             navigation.navigate('NestedChat', { docId: docRef.id, userID: yourNumber, handyID: hno });
    //           })
    //         }
    //       }


    //     });
    //     openchats.map((ocs) => console.log(ocs.key));
    //     setopenchats(openchats);
    //     setLoading(false);
    //     console.log("querysnapshots3");
    //   });

    db.collection("chats").where("hID", "==", hno)
      .where("uID", "==", yourNumber)
      .get()
      .then((querySnapshot) => {
        console.log("inside", querySnapshot.empty, "ok");
        if (!querySnapshot.empty) {
          //redirect to chat nav
          querySnapshot.forEach((doc) => {
            navigation.navigate('NestedChat', { docId: doc.id, userID: doc.data().uID, handyID: doc.data().hID })
          })

        }
        else {
                    //create document in chats, add info, create chats2, redirect
                    
                    console.log("else");
                    db.collection('chats').add({
                      hID: hno,
                      uID: yourNumber,
                      hname: hname,
                      uname: uname2
                    }).then((docRef) => {
                      console.log("document written with ID: ", docRef.id);
                      db.collection('chats/' + docRef.id + '/chats2');
                      navigation.navigate('NestedChat', { docId: docRef.id, userID: yourNumber, handyID: hno });
                    })
                  }


     /* querySnapshot.forEach(documentSnapshot => {
        // doc.data() is never undefined for query doc snapshots
        console.log("inside 2");
        console.log(documentSnapshot.id, " => ", documentSnapshot.data().hID);
      });*/

      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });


  }
  return (
    <View style={styles.Bookings}>
      <View style={styles.header}><Text style={{ fontFamily: "inter-bold", fontSize: 18, padding: 10 }}>YOUR BOOKINGS</Text></View>
      {tasks.length ?
        <FlatList
          style={styles.taskList}
          data={tasks}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <View style={styles.top}>
                <Text style={{ fontFamily: 'inter-regular', fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>Handyman: {item.handyName}</Text>
                <Text style={{ fontFamily: 'inter-regular', fontSize: 16, fontWeight: 'bold' }}>Service Type: {item.service}</Text>
                <Text style={{ fontFamily: 'inter-regular', fontSize: 16, fontWeight: 'bold' }}>Requested on: {item.timeStamp.substring(0, 16)}</Text>
                <Button
                  title="Opens Chat"
                  onPress={() => redirectChat(item.handyName, item.handyNumber, item.user)}
                />
              </View>

              {item.accepted ? <View style={styles.contact}><Text style={{ fontFamily: 'inter-bold', color: "green" }}>Accepted</Text><Text style={{ fontFamily: 'inter-bold', color: "blue", fontSize: 15, marginVertical: 10 }}>Handyman's number: {item.handyNumber}</Text></View> : item.rejected ? <View style={styles.bottom}>
                <Text style={{ color: "#f00", fontFamily: "inter-bold" }}>Rejected</Text>
              </View> : <View style={styles.bottom}>
                <Text style={{ color: "#e1ad01", fontFamily: "inter-bold" }}>Request Pending...</Text>
              </View>}

            </View>
          )}
        /> : <View style={styles.nobooking}><Image style={styles.image}
          source={require("../assets/images/no_bookings.png")} /><Text style={{ fontFamily: "inter-bold", fontSize: 20 }}>No bookings yet!</Text></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  Bookings: {
    marginTop: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#aaa",
  },
  container: {
    marginTop: 20,
    paddingTop: 20,

  },
  taskList: {
    padding: 20,
    marginBottom: 70
  },
  accept: {
    color: 'green',
    fontFamily: 'inter-bold'
  },
  reject: {
    color: 'red',
    fontFamily: 'inter-bold'
  },
  top: {
    marginBottom: 20,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contact: {
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    borderRadius: 10,
    backgroundColor: '#E6E6E6',
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
  image: {
    height: 200,
    width: 200
  },
  nobooking: {
    justifyContent: "center",
    alignItems: "center",
    height: 600
  }
});
