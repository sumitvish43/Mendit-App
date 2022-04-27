import React from "react";
import { Text, View } from "react-native";
// import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
export default function Results({ navigation, route }) {
  const serv = route.params.type;
  return (
    <View style={{ marginTop: 50, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 26 }}>{serv} services near you!</Text>

      {/* <Card style={{ padding: 20, width: 320 }}>
        <Card.Content>
          <Title>Mukesh Sharma</Title>
          <Paragraph>Rating: </Paragraph>
        </Card.Content>
        <Card.Cover source={require("../assets/images/placeholder.jpg")} />
        <Card.Actions>
          <Button>Chat</Button>
          <Button>Call Now</Button>
        </Card.Actions>
      </Card> */}
    </View>
  );
}
