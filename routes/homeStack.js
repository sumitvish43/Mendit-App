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


const Stack = createNativeStackNavigator();

export default function Navigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUpHandyman">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "Welcome", headerShown: false }}
        />
        <Stack.Screen 
          name='Home' 
          component={Home}
          options={{title: 'Home',headerShown: false}}
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
          name='SignUpHandyman' 
          component={SignUpHandyman}
          options={{title: 'SignUpHandyman',headerShown: false}}
        />
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
          name="HandyRoute"
          component={HandyRoute}
          options={{ title: "HandyRoute", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

