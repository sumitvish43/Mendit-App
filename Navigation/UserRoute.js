import * as React from "react";
import { BottomNavigation } from "react-native-paper";

import Home from "../screens/Home";
import Booking from "../screens/Bookings";
import Profile from "../screens/Profile";

export default function UserRoute({navigation, route}) {

  const userNumber = global.phoneNum;
  const HomeRoute = () => <Home navigation={navigation}/>;
  const ProfileRoute = () => <Profile navigation={navigation} mobile={userNumber}/>;
  const BookingsRoute = () => <Booking navigation={navigation}/>;

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
      key: "profile",
      title: "Profile",
      icon: "account-circle",
      color: "#007AFF",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
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
