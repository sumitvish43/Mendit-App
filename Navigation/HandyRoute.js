import * as React from "react";
import { BottomNavigation } from "react-native-paper";

import HandyHome from "../screens/HandyHome";
import HandyProfile from "../screens/HandyProfile";
import Chat from "../screens/Chat";
import Nestedchat from "../screens/nestedChat";

export default function HandyRoute({navigation}) {

  const HandyHomeRoute = () => <HandyHome navigation={navigation}/>;
  const HandyProfileRoute = () => <HandyProfile navigation={navigation}/>;
  const ChatRoute = () => <Chat navigation={navigation}/>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "handyhome",
      title: "New",
      icon: "moon-new",
      color: "#007",
      
    },
    {
      key: "chat",
      title: "Chat",
      icon: "chat",
      color: "#007AFF",
    },
    {
      key: "handyprofile",
      title: "Profile",
      icon: "account-hard-hat",
      color: "#007",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    handyhome: HandyHomeRoute,
    handyprofile: HandyProfileRoute,
    chat: ChatRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
