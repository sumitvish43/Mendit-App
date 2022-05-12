import * as React from "react";
import { BottomNavigation } from "react-native-paper";
// import AddTaskIcon from "@mui/icons-material/AddTask";

import HandyHome from "../screens/HandyHome";
import HandyChat from "../screens/HandyChat";
import HandyBooking from "../screens/HandyBookings";
import HandyProfile from "../screens/HandyProfile";
import Chat from "../screens/Chat";
import Nestedchat from "../screens/nestedChat";

<<<<<<< Updated upstream
const HandyHomeRoute = () => <HandyHome />;
const HandyChatRoute = () => <HandyChat />;
const HandyProfileRoute = () => <HandyProfile />;
const HandyBookingsRoute = () => <HandyBooking />;
=======
export default function HandyRoute({navigation}) {

  const HandyHomeRoute = () => <HandyHome navigation={navigation}/>;
  const HandyProfileRoute = () => <HandyProfile navigation={navigation}/>;
  const ChatRoute = () => <Chat navigation={navigation}/>;
>>>>>>> Stashed changes

export default function Route() {
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
      key: "handybooking",
      title: "Job History",
      icon: "briefcase",
      color: "#007",
    },
    {
      key: "handychat",
      title: "Chat",
      icon: "forum",
      color: "#007",
      badge: 1,
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
    handychat: HandyChatRoute,
    handyprofile: HandyProfileRoute,
<<<<<<< Updated upstream
    handybooking: HandyBookingsRoute,
=======
    chat: ChatRoute,
>>>>>>> Stashed changes
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
