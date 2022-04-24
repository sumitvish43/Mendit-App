import * as React from "react";
import { BottomNavigation } from "react-native-paper";
// import AddTaskIcon from "@mui/icons-material/AddTask";

import HandyHome from "../screens/HandyHome";
import HandyChat from "../screens/HandyChat";
import HandyBooking from "../screens/HandyBookings";
import HandyProfile from "../screens/HandyProfile";

const HandyHomeRoute = () => <HandyHome />;
const HandyChatRoute = () => <HandyChat />;
const HandyProfileRoute = () => <HandyProfile />;
const HandyBookingsRoute = () => <HandyBooking />;

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
    handybooking: HandyBookingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
