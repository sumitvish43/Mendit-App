import * as React from "react";
import { BottomNavigation } from "react-native-paper";

import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Booking from "../screens/Bookings";
import Profile from "../screens/Profile";

const HomeRoute = () => <Home />;
const ChatRoute = () => <Chat />;
const ProfileRoute = () => <Profile />;
const BookingsRoute = () => <Booking />;

export default function Route() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      icon: "home",
      color: "#007AFF",
    },
    {
      key: "booking",
      title: "My Bookings",
      icon: "calendar-text",
      color: "#007AFF",
    },
    {
      key: "chat",
      title: "Chat",
      icon: "forum",
      color: "#007AFF",
      badge: 1,
    },
    {
      key: "profile",
      title: "Profile",
      icon: "account-circle",
      color: "#007AFF",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    chat: ChatRoute,
    profile: ProfileRoute,
    booking: BookingsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
