import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from "../screens/welcome";
import Login from "../screens/login";
import SignUpAs from "../screens/signupas";
import SignUpUser from "../screens/signupuser";
import Verify from "../screens/verify";

const Stack = createNativeStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Verify'>
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
            </Stack.Navigator>
    
        </NavigationContainer>    
    );
}