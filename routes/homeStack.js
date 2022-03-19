import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from "../screens/welcome";
import Login from "../screens/login";

const Stack = createNativeStackNavigator();

export default function Navigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Welcome'>
                <Stack.Screen 
                    name='Welcome' 
                    component={Welcome}
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name='Login' 
                    component={Login}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
    
        </NavigationContainer>    
    );
}