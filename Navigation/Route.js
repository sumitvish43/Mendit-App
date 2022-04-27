import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Booking from "../screens/Bookings";
import Profile from "../screens/Profile";
import Results from "../screens/Results";

const Stack = createNativeStackNavigator();

export default function Route({ navigation }) {
  const HomeRoute = () => <Home navigation={navigation} />;
  const ChatRoute = () => <Chat navigation={navigation} />;
  const ProfileRoute = () => <Profile navigation={navigation} />;
  const BookingsRoute = () => <Booking navigation={navigation} />;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      icon: "home",
      color: "#007AFF",
      nav: navigation,
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
    <>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName="Results">
          <Stack.Screen
            name="Results"
            component={Results}
            options={{ title: "Results", headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer> */}
    </>
  );
}
