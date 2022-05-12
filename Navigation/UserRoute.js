import * as React from "react";
import { BottomNavigation } from "react-native-paper";

import Home from "../screens/Home";
import Booking from "../screens/Bookings";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";

export default function UserRoute({navigation, route}) {

  const userNumber = global.phoneNum;
  const HomeRoute = () => <Home navigation={navigation}/>;
  const ProfileRoute = () => <Profile navigation={navigation} mobile={userNumber}/>;
  const BookingsRoute = () => <Booking navigation={navigation}/>;
  const ChatRoute = () => <Chat navigation={navigation}/>;

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      icon: "home",
      color: "#000",
    },
    {
      key: "booking",
      title: "My Bookings",
      icon: "calendar-text",
      color: "#007aff",
    },
    {
      key: "chat",
      title: "Chat",
      icon: "chat",
      color: "#000",
    },
    {
      key: "profile",
      title: "Profile",
      icon: "account-circle",
      color: "#000",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    profile: ProfileRoute,
    booking: BookingsRoute,
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
