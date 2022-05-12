import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
} from "react-native";
import { db } from "../../firebase";

// definition of the Item, which will be rendered in the FlatList
const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

export default function Delete(){
const delColl = () => {
  var jobskill_query = db.collection('chats').where('hname', '==', 'Ganesh Mali');
  jobskill_query.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      doc.ref.delete();
    });
  });
};

return (
  <SafeAreaView style={styles.list__container}>
    <Button
      title="Delete Collections"
      onPress={() => delColl()}
    />
  </SafeAreaView>
);
};



const styles = StyleSheet.create({
  list__container: {
    margin: 10,
    height: "85%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});