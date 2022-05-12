import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/welcome";
import Login from "../screens/login";
import SignUpAs from "../screens/signupas";
import SignUpUser from "../screens/signupuser";
import Verify from "../screens/verify";
import UserRoute from "../Navigation/Route";
import HandyRoute from "../Navigation/HandyRoute";
// import Profile from "../screens/Profile";
import Home from "../screens/Home";
// import Bookings from "../screens/Bookings";
import SignUpHandyman from "../screens/signuphandyman";
<<<<<<< Updated upstream
import Services from "../screens/Services";
import Results from "../screens/Results";
=======
import Results from "../screens/results";
import Card from "../screens/components/card";
import DeleteCollection from "../screens/components/DeleteCollection";
import SentRequest from "../screens/sentRequest";
import NestedChat from "../screens/nestedChat";
>>>>>>> Stashed changes

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Home", headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login", headerShown: false }}
        />
        <Stack.Screen
          name="SignUpAs"
          component={SignUpAs}
          options={{ title: "SignUpAs", headerShown: false }}
        />
        <Stack.Screen
          name="SignUpUser"
          component={SignUpUser}
          options={{ title: "SignUpUser", headerShown: false }}
        />
        <Stack.Screen
          name="SignUpHandyman"
          component={SignUpHandyman}
          options={{ title: "SignUpHandyman", headerShown: false }}
        />
<<<<<<< Updated upstream
=======

        <Stack.Screen
          name='SentRequest'
          component={SentRequest}
          options={{ title: 'SentRequest', headerShown: false }}
        />
>>>>>>> Stashed changes
        <Stack.Screen
          name="Verify"
          component={Verify}
          options={{ title: "Verify", headerShown: false }}
        />
        <Stack.Screen
          name="UserRoute"
          component={UserRoute}
          options={{ title: "UserRoute", headerShown: false }}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{ title: "Services", headerShown: false }}
        />
        <Stack.Screen
<<<<<<< Updated upstream
          name="Results"
          component={Results}
          options={{ title: "Results", headerShown: false }}
=======
          name='Card'
          component={Card}
          options={{ title: 'home2', headerShown: false }}
        />
        <Stack.Screen
          name='DeleteCollection'
          component={DeleteCollection}
          options={{ title: 'DeleteCollection', headerShown: false }}
        />
        <Stack.Screen
          name='Results'
          component={Results}
          options={{ title: 'Results', headerShown: false }}
        />
        <Stack.Screen
          name='NestedChat'
          component={NestedChat}
          options={{ title: 'NestedChat', headerShown: false }}
>>>>>>> Stashed changes
        />
        <Stack.Screen
          name="HandyRoute"
          component={HandyRoute}
          options={{ title: "HandyRoute", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
