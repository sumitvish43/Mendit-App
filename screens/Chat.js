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
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

import { db } from "../firebase";

export default function Chat({ navigation }) {
    const [openchats, setopenchats] = useState([]);
    const [loading, setLoading] = useState(true);
    const yourNumber = global.phoneNum;

    useEffect(() => {
        const task =
            db.collection('chats')
                .onSnapshot(querySnapshot => {
                    const openchats = [];
                    querySnapshot.forEach(documentSnapshot => {
                        if (documentSnapshot.data().uID == yourNumber || documentSnapshot.data().hID == yourNumber) { //uID stores id of user in convo, similarly for hID
                            openchats.push({
                                handyID: documentSnapshot.data().hID,
                                handyName: documentSnapshot.data().hname,
                                userID: documentSnapshot.data().uID,
                                uName: documentSnapshot.data().uname,
                                key: documentSnapshot.id,
                            });
                        }
                    });
                    openchats.map((ocs) => console.log(ocs.key));
                    setopenchats(openchats);
                    setLoading(false);
                });

        return () => task();
    }, []);

    return (
        <View style={styles.Bookings}>
            <View style={styles.header}><Text style={{ fontFamily: "inter-bold", fontSize: 18, padding: 10 }}>YOUR CHATS</Text></View>
            {openchats.length ?
                <FlatList
                    style={styles.taskList}
                    data={openchats}
                    renderItem={({ item }) => (
                        //<TouchableOpacity
                        //onPress={() => navigation.navigate('nestedChat', item.key, item.userID, item.handyID)}
                        // onPress={() => navigation.navigate('Results', { type: "AC service" })}
                        //  >
                        
                        <View style={styles.cardContainer}>

                            <View style={styles.top} >

                                {(item.userID == yourNumber) && <Text style={{ fontFamily: 'inter-regular', fontSize: 18, marginBottom: 10 }}>{item.handyName}</Text>}
                                {(item.handyID == yourNumber) && <Text style={{ fontFamily: 'inter-regular', fontSize: 18, marginBottom: 10 }}>{item.uName}</Text>}
                                {console.log("chat.js", item.key, item.userID, item.handyID)}
                            </View>
                            
                            <Button
                                title="Open Chat"
                                onPress={() => navigation.navigate('NestedChat', {docId: item.key,userID: item.userID, handyID: item.handyID })}
                            />
                            {console.log("Button",item.key)}
                        </View>
                        //{</TouchableOpacity>}
                    )}
                /> : <View style={styles.nobooking}><Image style={styles.image}
                    source={require("../assets/images/no_bookings.png")} /><Text style={{ fontFamily: "inter-bold", fontSize: 20 }}>No Chats Yet!</Text></View>}
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
