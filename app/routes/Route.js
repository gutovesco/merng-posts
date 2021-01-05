import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'

const Stack = createStackNavigator();

const Routes = () => (
    <Stack.Navigator
        initialRouteName="signin"
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#fff' },
        }}
    >
        <Stack.Screen name="signin" component={SignIn} />
        <Stack.Screen name="signup" component={SignUp} />
    </Stack.Navigator>
)

export default Routes;