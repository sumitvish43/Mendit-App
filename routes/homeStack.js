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

import Profile from "../screens/Profile";
import Home from "../screens/Home";
import Bookings from "../screens/Bookings";
import Location from "../screens/location"
import HandyHome from "../screens/HandyHome"


const Stack = createNativeStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome'>
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
                    options={{title: 'Home',headerShown: false}}
                />
                <Stack.Screen 
                    name='Location' 
                    component={Location}
                    options={{title: 'Location',headerShown: false}}
                />
                <Stack.Screen 
                    name='HandyHome' 
                    component={HandyHome}
                    options={{title: 'HandyHome',headerShown: false}}
                />
                <Stack.Screen 
                    name='UserRoute' 
                    component={UserRoute}
                    options={{title: 'UserRoute',headerShown: false}}
                />
                <Stack.Screen 
                    name='HandyRoute' 
                    component={HandyRoute}
                    options={{title: 'HandyRoute',headerShown: false}}
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
