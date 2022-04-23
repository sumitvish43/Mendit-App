import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/welcome";
import Login from "../screens/login";
import SignUpAs from "../screens/signupas";
import SignUpUser from "../screens/signupuser";
import Verify from "../screens/verify";
<<<<<<< HEAD
import UserRoute from "../Navigation/Route";
import HandyRoute from "../Navigation/HandyRoute";
=======
import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Bookings from "../screens/Bookings";
>>>>>>> 8a23e011e913b581e41b9c0c504e64eb9e9bd678

const Stack = createNativeStackNavigator();

export default function Navigator() {
<<<<<<< HEAD
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ title: "Welcome", headerShown: false }}
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
=======
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignUpUser'>
                <Stack.Screen 
                    name='Welcome' 
                    component={Welcome}
                    options={{title: 'Welcome',headerShown: false}}
                />
                <Stack.Screen 
                    name='Login' 
                    component={Login}
                    options={{title: 'Login',headerShown: false}}
                />
                <Stack.Screen 
                    name='SignUpAs' 
                    component={SignUpAs}
                    options={{title: 'SignUpAs',headerShown: false}}
                />
                <Stack.Screen 
                    name='SignUpUser' 
                    component={SignUpUser}
                    options={{title: 'SignUpUser',headerShown: false}}
                />
                <Stack.Screen 
                    name='Verify' 
                    component={Verify}
                    options={{title: 'Verify',headerShown: false}}
                />
                <Stack.Screen 
                    name='Home' 
                    component={Home}
                    options={{title: 'Home',headerShown: false}}
                />
                <Stack.Screen 
                    name='Bookings' 
                    component={Bookings}
                    options={{title: 'Bookings',headerShown: false}}
                />
                <Stack.Screen 
                    name='Profile' 
                    component={Profile}
                    options={
                        {
                            title: 'My Profile',
                            headerShown: true,
                            headerStyle: {
                                backgroundColor: '#009ffd',
                            },
                            headerTintColor: '#fff',
                        }
                    }
                />
            </Stack.Navigator>
    
        </NavigationContainer>    
    );
}
>>>>>>> 8a23e011e913b581e41b9c0c504e64eb9e9bd678
